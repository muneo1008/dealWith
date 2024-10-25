package com.muneo.dealwith.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
public class AuctionRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_id")
    private Auction auction; // 경매에 연결된 채팅방

    @OneToMany(mappedBy = "auctionRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AuctionRoomPart> participants = new HashSet<>();

    public void addParticipant(AuctionRoomPart participant) {
        participants.add(participant);  // participants 컬렉션에 추가
        participant.setAuctionRoom(this);  // 양방향 연관 관계 설정
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AuctionRoom)) return false;
        AuctionRoom room = (AuctionRoom) o;
        return Objects.equals(idx, room.idx); // idx로 비교
    }

    @Override
    public int hashCode() {
        return Objects.hash(idx); // idx로 해시코드 생성
    }
}
