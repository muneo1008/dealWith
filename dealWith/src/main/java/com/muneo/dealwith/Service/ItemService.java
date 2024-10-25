package com.muneo.dealwith.Service;

import com.muneo.dealwith.Dto.CustomUser;
import com.muneo.dealwith.Dto.ItemDto;
import com.muneo.dealwith.Entity.Item;
import com.muneo.dealwith.Repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;


    public List<Item> getItems(Long userIdx) {
        List<Item> itemDtos = itemRepository.findItemsExcludingUser(userIdx);

        return itemDtos;
    }
}
