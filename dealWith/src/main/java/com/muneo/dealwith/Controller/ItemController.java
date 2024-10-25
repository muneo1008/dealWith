package com.muneo.dealwith.Controller;

import com.muneo.dealwith.Dto.CustomUser;
import com.muneo.dealwith.Dto.GcsRequest;
import com.muneo.dealwith.Dto.ItemDto;
import com.muneo.dealwith.Entity.Item;
import com.muneo.dealwith.Entity.Member;
import com.muneo.dealwith.Repository.ItemRepository;
import com.muneo.dealwith.Service.GcsService;
import com.muneo.dealwith.Service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final GcsService gcsService;
    private final ItemRepository itemRepository;
    private final ItemService itemService;
    @PostMapping("/additem")
    public Item add(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam int price,
            @RequestParam boolean priceNegotiation,
            @RequestParam MultipartFile itemImage,
            Authentication auth
    ) throws IOException {
        CustomUser user = (CustomUser) auth.getPrincipal();

        GcsRequest itemRequest = new GcsRequest();
        itemRequest.setName(user.getUsername());
        itemRequest.setFile(itemImage);
        String imgUrl = gcsService.uploadObject(itemRequest);

        Item newItem = new Item();
        var member = new Member();
        Long idx = Long.parseLong(user.getUserIdx());
        member.setIdx(idx);


        newItem.setMember(member);
        newItem.setTitle(title);
        newItem.setDescription(description);
        newItem.setPrice(price);
        newItem.setImg_url(imgUrl);
        newItem.setPriceNego(priceNegotiation);

        return itemRepository.save(newItem);
    }

    @GetMapping("/showitem")
    public List<ItemDto> getItems(Authentication auth) {
        var user = (CustomUser) auth.getPrincipal();
        Long userIdx = Long.parseLong(user.getUserIdx());
        List<Item> items = itemService.getItems(userIdx);

        List<ItemDto> itemDtos = items.stream()
                .map(item -> new ItemDto(
                        item.getIdx(),
                        item.getMember().getIdx(),
                        item.getTitle(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getImg_url()
                ))
                .toList();

        return itemDtos;
    }

    @GetMapping("/item/{id}")
    public ItemDto getItem(@PathVariable Long id){
        Item item = itemRepository.findById(id).orElse(null);

        ItemDto itemDto = new ItemDto(
                item.getIdx(),
                item.getMember().getIdx(),
                item.getTitle(),
                item.getDescription(),
                item.getPrice(),
                item.getImg_url());


        return itemDto;
    }

    @GetMapping("/myitem/{id}")
    public List<ItemDto> getMyItems(@PathVariable Long id){
        List<Item> items = itemRepository.findItemsByUser(id);
        List<ItemDto> itemDtos = items.stream()
                .map(item -> new ItemDto(
                        item.getIdx(),
                        item.getMember().getIdx(),
                        item.getTitle(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getImg_url()
                ))
                .toList();


        return itemDtos;
    }
}
