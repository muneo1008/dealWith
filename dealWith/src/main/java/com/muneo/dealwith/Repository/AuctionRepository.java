package com.muneo.dealwith.Repository;

import com.muneo.dealwith.Entity.Auction;
import com.muneo.dealwith.Entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByIdx(Long idx);

    @Query("SELECT a FROM Auction a WHERE a.member.idx = :userIdx")
    List<Auction> findItemsByUser(@Param("userIdx") Long userIdx);
}
