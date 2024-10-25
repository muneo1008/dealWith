package com.muneo.dealwith.Dto;

import com.muneo.dealwith.Entity.AuctionRoomPart;
import lombok.Data;

@Data
public class AuctionRoomPartDto {
    private Long idx;
    private Long auctionRoomId;
    private Long memberId;
    private String memberName; // Member의 추가 필드

    public AuctionRoomPartDto(AuctionRoomPart auctionRoomPart) {
        this.idx = auctionRoomPart.getIdx();
        this.auctionRoomId = auctionRoomPart.getAuctionRoom().getIdx();
        this.memberId = auctionRoomPart.getMember().getIdx();
        this.memberName = auctionRoomPart.getMember().getNick_name(); // 추가 데이터
    }
}
