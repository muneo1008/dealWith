package com.muneo.dealwith.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuctionDto {
    private Long idx;
    private String title;
    private String description;
    private Long memberId;
    private int startPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String imgUrl;
    private LocalDateTime createdAt;
    private Long roomId;
    private Long highestPrice;
    public AuctionDto(Long idx, String title, Long highestPrice,Long roomId) {
        this.idx = idx;
        this.title = title;
        this.highestPrice = highestPrice;
        this.roomId = roomId;

    }
    public AuctionDto(Long idx,
                      String title,
                      String description,
                      Long memberId,
                      int startPrice,
                      LocalDateTime startTime,
                      LocalDateTime endTime,
                      String imgUrl,
                      LocalDateTime createdAt){
        this.idx = idx;
        this.title = title;
        this.description = description;
        this.memberId = memberId;
        this.startPrice = startPrice;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imgUrl = imgUrl;
        this.createdAt = createdAt;
    }



    public AuctionDto() {}
}
