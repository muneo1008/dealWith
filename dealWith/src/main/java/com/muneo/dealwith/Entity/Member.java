package com.muneo.dealwith.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.security.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private Long idx; // Primary key

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column( nullable = false, unique = true, length = 20)
    private String nick_name;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column( nullable = false, columnDefinition = "int default 0")
    private int manner_core = 0;

    @Column( nullable = false)
    private LocalDate created_at = LocalDate.now();

    @Column(nullable = false, length = 20)
    private String location;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AuctionRoomPart> auctionRoomParts = new ArrayList<>(); //

    public void addAuctionParticipation(AuctionRoomPart participation) {
        auctionRoomParts.add(participation);
        participation.setMember(this);
    }
}
