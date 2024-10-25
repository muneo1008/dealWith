package com.muneo.dealwith.Dto;

import com.muneo.dealwith.Entity.AuctionMessage;
import lombok.Data;

@Data
public class AuctionMessageDto {
    private Long id;
    private Long senderId;
    private String price;
    private Long roomId;
    public AuctionMessageDto(Long id, Long senderId, String price, Long roomId) {
        this.id = id;
        this.senderId = senderId;
        this.price = price;
        this.roomId = roomId;
    }
}
