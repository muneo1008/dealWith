package com.muneo.dealwith.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@Table(name = "auction")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_idx")
    @JsonIgnoreProperties("auction")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude

    private Member member;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "start_price", nullable = false)
    private int startPrice;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "img_url", length = 255, nullable = false)
    private String imgUrl;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();  // 현재 시간 기본값

    @Column(name = "status", nullable = false)
    private boolean status = false;

    @Column(name = "highest_price")

    private Long highestPrice;

    @OneToOne(mappedBy = "auction",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnoreProperties("auction")
    @ToString.Exclude
    private AuctionRoom auctionRoom;


    @Column(name = "highest_user_idx")
    private Long highestUser;  // 최고 입찰자의 외래키 참조
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Auction)) return false;
        Auction auction = (Auction) o;
        return Objects.equals(idx, auction.idx); // idx로 비교
    }

    @Override
    public int hashCode() {
        return Objects.hash(idx); // idx로 해시코드 생성
    }

}
