package com.muneo.dealwith.Dto;

import com.muneo.dealwith.Entity.Member;
import lombok.Data;

@Data
public class ItemDto {
    private Long idx;
    private String title;
    private String description;
    private int price;
    private boolean priceNego;
    private boolean status;
    private String imgUrl;
    private Long userIdx;

    public ItemDto(Long idx,
                Long userIdx,
                String title,
                String description,
                int price,
                String imgUrl) {
        this.idx = idx;
        this.userIdx = userIdx;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imgUrl = imgUrl;

    }
}
