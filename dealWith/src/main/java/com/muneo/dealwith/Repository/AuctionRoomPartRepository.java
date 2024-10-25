package com.muneo.dealwith.Repository;

import com.muneo.dealwith.Entity.AuctionRoomPart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionRoomPartRepository extends JpaRepository<AuctionRoomPart, Long> {
    List<AuctionRoomPart> findByMember_Idx(Long memberId);
}
