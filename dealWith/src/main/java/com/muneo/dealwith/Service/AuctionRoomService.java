package com.muneo.dealwith.Service;

import com.muneo.dealwith.Dto.AuctionDto;
import com.muneo.dealwith.Dto.AuctionRequestDto;
import com.muneo.dealwith.Dto.CustomUser;
import com.muneo.dealwith.Dto.GcsRequest;
import com.muneo.dealwith.Entity.*;
import com.muneo.dealwith.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuctionRoomService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final AuctionRoomPartRepository auctionRoomPartRepository;
    private final MemberRepository memberRepository;
    private final AuctionRepository auctionRepository;
    private final AuctionMessageRepository auctionMessageRepository;
    private final GcsService gcsService;
    @Transactional
    public Auction createAuction(AuctionRequestDto auctionRequestDto,
                                 @RequestParam MultipartFile itemImage,
                                 Authentication auth) throws IOException {
        CustomUser user = (CustomUser) auth.getPrincipal();
        Long userIdx = Long.parseLong(user.getUserIdx());
        Member creator = memberRepository.findById(userIdx).orElseThrow(() -> new IllegalArgumentException("Member not found"));


        GcsRequest auctionRequest = new GcsRequest();
        auctionRequest.setName("auction_"+user.getUsername());
        auctionRequest.setFile(itemImage);
        String imgUrl = gcsService.uploadObject(auctionRequest);


        Auction auction = new Auction();
        auction.setTitle(auctionRequestDto.getTitle());
        auction.setDescription(auctionRequestDto.getDescription());
        auction.setStartTime(auctionRequestDto.getStartTime());
        auction.setEndTime(auctionRequestDto.getEndTime());
        auction.setStartPrice(auctionRequestDto.getStartPrice());
        auction.setImgUrl(imgUrl);

        auction.setMember(creator);

        // 경매 저장
        auctionRepository.save(auction);

        // 경매에 대한 채팅방 생성
        AuctionRoom auctionRoom = new AuctionRoom();
        auctionRoom.setAuction(auction);
        auctionRoomRepository.save(auctionRoom);

        return auction;
    }


    // 경매 방에 사용자 추가
    @Transactional
    public void joinAuctionRoom(Long auctionId, Long memberId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new IllegalArgumentException("AuctionRoom not found"));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        AuctionRoom auctionRoom = auction.getAuctionRoom();

        AuctionRoomPart participant = new AuctionRoomPart(auction, member,auctionRoom);
        auctionRoom.addParticipant(participant);

        member.addAuctionParticipation(participant);

        auctionRoomPartRepository.save(participant); // 채팅방 갱신
    }

    @Transactional
    public AuctionMessage addChatMessage(Long auctionRoomId, Long senderId, String price) {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionRoomId)
                .orElseThrow(() -> new IllegalArgumentException("AuctionRoom not found"));

        Member sender = memberRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        AuctionMessage message = new AuctionMessage();
        message.setAuctionRoom(auctionRoom);
        message.setSender(sender);
        message.setPrice(price);
        message.setTimestamp(LocalDateTime.now());

        return auctionMessageRepository.save(message); // 메시지 저장
    }

    public List<AuctionDto> getAllAuctions(){
        List<Auction> auctions = auctionRepository.findAll();
        return auctions.stream().map(auction -> {
            AuctionDto dto = new AuctionDto();
            dto.setIdx(auction.getIdx());
            dto.setTitle(auction.getTitle());
            dto.setDescription(auction.getDescription());
            dto.setStartPrice(auction.getStartPrice());
            dto.setCreatedAt(auction.getCreatedAt());
            dto.setEndTime(auction.getEndTime());
            dto.setStartTime(auction.getStartTime());
            dto.setImgUrl(auction.getImgUrl());
            dto.setMemberId(auction.getMember().getIdx());
            return dto;
        }).collect(Collectors.toList());
    }
}
