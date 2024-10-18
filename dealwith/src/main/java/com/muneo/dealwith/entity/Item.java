package com.muneo.dealwith.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String itemName;
    private String itemDescription;
    private int price;
    private String transMethod;
    private boolean priceNego;
    private String img_url;
}
