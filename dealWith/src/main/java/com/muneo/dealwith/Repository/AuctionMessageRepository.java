package com.muneo.dealwith.Repository;

import com.muneo.dealwith.Entity.AuctionMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionMessageRepository extends JpaRepository<AuctionMessage,Long> {
}
