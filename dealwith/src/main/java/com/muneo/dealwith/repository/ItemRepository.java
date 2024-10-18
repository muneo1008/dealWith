package com.muneo.dealwith.repository;

import com.muneo.dealwith.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
