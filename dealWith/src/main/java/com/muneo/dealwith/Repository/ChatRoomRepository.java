package com.muneo.dealwith.Repository;

import com.muneo.dealwith.Entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByBuyerIdOrSellerId(Long buyerId, Long sellerId);

    @Query("SELECT c FROM ChatRoom c WHERE c.buyerId = :userIdx OR c.sellerId = :userIdx")
    List<ChatRoom> findByChatListId(@Param("userIdx") Long userIdx);

}
