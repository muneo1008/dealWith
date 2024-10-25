package com.muneo.dealwith.Repository;

import com.muneo.dealwith.Dto.ItemDto;
import com.muneo.dealwith.Entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("SELECT i FROM Item i WHERE i.member.idx <> :userIdx")
    List<Item> findItemsExcludingUser(@Param("userIdx") Long userIdx);

    @Query("SELECT i FROM Item i WHERE i.member.idx = :userIdx")
    List<Item> findItemsByUser(@Param("userIdx") Long userIdx);
}
