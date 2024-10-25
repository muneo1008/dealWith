package com.muneo.dealwith.Service;

import com.muneo.dealwith.Entity.AuctionMessage;
import com.muneo.dealwith.Entity.AuctionRoom;
import com.muneo.dealwith.Entity.Member;
import com.muneo.dealwith.Repository.AuctionMessageRepository;
import com.muneo.dealwith.Repository.AuctionRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuctionMessageService {
    private final AuctionMessageRepository auctionMessageRepository;
    private final AuctionRoomRepository auctionRoomRepository;

    @Transactional
    public AuctionMessage sendMessage(Long roomId, Long senderId, int price){
        AuctionRoom auctionRoom = auctionRoomRepository.findById(roomId).orElse(null);

        AuctionMessage auctionMessage = new AuctionMessage();
        auctionMessage.setAuctionRoom(auctionRoom);
        Member member  = new Member();
        member.setIdx(senderId);
        auctionMessage.setSender(member);
        auctionMessage.setPrice(price);

        return auctionMessageRepository.save(auctionMessage);
    }

}
