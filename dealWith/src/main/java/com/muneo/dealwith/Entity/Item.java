package com.muneo.dealwith.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @ManyToOne // Many-to-One 관계 설정 FK
    @JoinColumn(name = "user_idx", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column( nullable = false)
    private int price;

    @Column(length = 255, nullable = false)
    private String img_url;

    @Column(nullable = false)
    private LocalDate created_at = LocalDate.now();

    @Column(nullable = false) //false는 판매중 true는 판매완료
    private boolean status = false;

    @Column(nullable = false)
    private boolean priceNego = false;



}
