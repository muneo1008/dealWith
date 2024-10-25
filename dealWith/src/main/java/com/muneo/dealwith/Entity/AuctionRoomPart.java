package com.muneo.dealwith.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class AuctionRoomPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 참여하는 경매
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_room_id")
    private AuctionRoom auctionRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 참가한 사용자

    public AuctionRoomPart(Auction auction, Member member, AuctionRoom auctionRoom) {
        this.auction = auction;
        this.member = member;
        this.auctionRoom = auctionRoom;
    }

    public AuctionRoomPart() {
    }
}
