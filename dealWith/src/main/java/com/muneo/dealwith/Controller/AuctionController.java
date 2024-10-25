package com.muneo.dealwith.Controller;

import com.muneo.dealwith.Dto.*;
import com.muneo.dealwith.Entity.*;
import com.muneo.dealwith.Repository.AuctionRepository;
import com.muneo.dealwith.Repository.ItemRepository;
import com.muneo.dealwith.Service.AuctionRoomPartService;
import com.muneo.dealwith.Service.AuctionRoomService;
import com.muneo.dealwith.Service.GcsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class AuctionController {

    private final GcsService gcsService;
    private final AuctionRepository auctionRepository;
    private final AuctionRoomService auctionRoomService;
    private final AuctionRoomPartService auctionRoomPartService;
    private final ItemRepository itemRepository;

    @GetMapping("/load/auction")
    public List<AuctionDto> loadAuction() {

        return auctionRoomService.getAllAuctions();
    }


    @PostMapping("/add/auction")
    public String addAuction(AuctionRequestDto auctionRequestDto,
                             @RequestParam MultipartFile itemImage,
                             Authentication auth) throws IOException {
        Auction createAuction = auctionRoomService.createAuction(auctionRequestDto, itemImage, auth);

        return createAuction.toString();
    }

    @GetMapping("/auction/{id}")
    public ResponseEntity<AuctionDto> getAuction(@PathVariable Long id){
        Auction auction = auctionRepository.findById(id).orElse(null);
        AuctionDto auctionDto = new AuctionDto();
        auctionDto.setTitle(auction.getTitle());
        auctionDto.setDescription(auction.getDescription());
        auctionDto.setImgUrl(auction.getImgUrl());
        auctionDto.setEndTime(auction.getEndTime());
        auctionDto.setStartTime(auction.getStartTime());
        auctionDto.setStartPrice(auction.getStartPrice());
        auctionDto.setIdx(auction.getIdx());
        auctionDto.setCreatedAt(auction.getCreatedAt());
        auctionDto.setRoomId(auction.getAuctionRoom().getIdx());


        return ResponseEntity.ok(auctionDto);
    }

    @GetMapping("/myauction/{id}")
    public List<AuctionDto> getMyAuction(@PathVariable Long id){
        List<Auction> auctions = auctionRepository.findItemsByUser(id);
        List<AuctionDto> auctionDtos = auctions.stream()
                .map(auction -> new AuctionDto(
                        auction.getIdx(),
                        auction.getTitle(),
                        auction.getDescription(),
                        auction.getMember().getIdx(),
                        auction.getStartPrice(),
                        auction.getStartTime(),
                        auction.getEndTime(),
                        auction.getImgUrl(),
                        auction.getCreatedAt()
                )).toList();
        return auctionDtos;
    }

    @PostMapping("/auctionRoom/{roomId}/join")
    public ResponseEntity<Void> joinAuctionRoom(@PathVariable Long roomId,
                                                  Authentication auth) throws IOException {
        CustomUser user = (CustomUser) auth.getPrincipal();
        Long userIdx = Long.parseLong(user.getUserIdx());

        auctionRoomService.joinAuctionRoom(roomId, userIdx);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auctionRoom/{roomId}/message")
    public ResponseEntity<AuctionMessage> sendMessage(@PathVariable Long roomId, @RequestBody AuctionMessageDto auctionMessageDto,
                                                   Authentication auth) {
        CustomUser userDetails = (CustomUser) auth.getPrincipal();
        Long senderId = Long.parseLong(userDetails.getUserIdx());

        AuctionMessage message = auctionRoomService.addChatMessage(roomId, senderId, auctionMessageDto.getPrice());
        return ResponseEntity.ok(message);
    }

    @GetMapping("/my-auction-rooms")
    public ResponseEntity<List<AuctionDto>> getMyActionRooms(Authentication auth) {
        CustomUser user = (CustomUser) auth.getPrincipal();
        Long userIdx = Long.parseLong(user.getUserIdx());
        List<AuctionRoomPart> actionRooms = auctionRoomPartService.getActionRoomsByMemberId(userIdx);
        List<AuctionDto> auctionDTOs = actionRooms.stream()
                .map(actionRoom -> new AuctionDto(actionRoom.getAuction().getIdx(),
                        actionRoom.getAuction().getTitle(),
                        actionRoom.getAuction().getHighestPrice(),
                        actionRoom.getAuctionRoom().getIdx()))
                .collect(Collectors.toList());


        return ResponseEntity.ok(auctionDTOs);
    }
}
