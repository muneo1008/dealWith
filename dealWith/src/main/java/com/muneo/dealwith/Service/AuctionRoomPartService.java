package com.muneo.dealwith.Service;

import com.muneo.dealwith.Entity.AuctionRoomPart;
import com.muneo.dealwith.Repository.AuctionRoomPartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionRoomPartService {

    private final AuctionRoomPartRepository auctionRoomPartRepository;
    public List<AuctionRoomPart> getActionRoomsByMemberId(Long memberId) {
        return auctionRoomPartRepository.findByMember_Idx(memberId);
    }
}
