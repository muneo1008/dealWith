package com.muneo.dealwith.controller;

import com.muneo.dealwith.dto.GcsRequest;
import com.muneo.dealwith.entity.Item;
import com.muneo.dealwith.repository.ItemRepository;
import com.muneo.dealwith.service.GcsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final GcsService gcsService;
    private final ItemRepository itemRepository;

    @PostMapping("/additem")
    public Item add(
            @RequestParam String username,
            @RequestParam String itemName,
            @RequestParam String itemDescription,
            @RequestParam int itemPrice,
            @RequestParam String transactionMethod,
            @RequestParam boolean priceNegotiation,
            @RequestParam MultipartFile itemImage
    ) throws IOException {
        GcsRequest itemRequest = new GcsRequest();
        itemRequest.setName(username);
        itemRequest.setFile(itemImage);
        String imgUrl = gcsService.uploadObject(itemRequest);

        Item newItem = new Item();
        newItem.setUsername(username);
        newItem.setItemName(itemName);
        newItem.setItemDescription(itemDescription);
        newItem.setPrice(itemPrice);
        newItem.setTransMethod(transactionMethod);
        newItem.setPriceNego(priceNegotiation);
        newItem.setImg_url(imgUrl);

        return itemRepository.save(newItem);
    }

    @GetMapping("/showitem")
    public List<Item> getItems() {
        return itemRepository.findAll();
    }
}
