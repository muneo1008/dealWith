package com.muneo.dealwith.Controller;

import com.muneo.dealwith.Dto.ChatMessageDto;
import com.muneo.dealwith.Dto.CustomUser;
import com.muneo.dealwith.Dto.RequestChatDto;
import com.muneo.dealwith.Entity.ChatMessage;
import com.muneo.dealwith.Entity.ChatRoom;
import com.muneo.dealwith.Repository.ChatMessageRepository;
import com.muneo.dealwith.Repository.ChatRoomRepository;
import com.muneo.dealwith.Service.ChatMessageService;
import com.muneo.dealwith.Service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatRoomService chatRoomService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    @MessageMapping("/chat/{chatRoomId}")
    public void sendMessage(@DestinationVariable Long chatRoomId,String message,Authentication auth) {
        System.out.println("chatRoomId: " + chatRoomId);
        System.out.println("message: " + message);
        var user = (CustomUser) auth.getPrincipal();
        Long userIdx = Long.parseLong(user.getUserIdx());
        // 메시지를 DB에 저장

        ChatMessage savedMessage = chatMessageService.sendMessage(chatRoomId, userIdx, message);

        // 메시지를 클라이언트에게 전송
        messagingTemplate.convertAndSend("/topic/chat/" + chatRoomId, savedMessage);
    }

    @GetMapping("/load/chat/{chatRoomId}")
    public List<ChatMessageDto> loadChat(@PathVariable Long chatRoomId) {
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomId(chatRoomId);
        List<ChatMessageDto> responseDtos = messages.stream().map(message->{
            ChatMessageDto chatMessageDto = new ChatMessageDto();
            chatMessageDto.setChatRoomId(message.getChatRoom().getId());
            chatMessageDto.setMessage(message.getMessage());
            chatMessageDto.setSenderId(message.getSenderId());
            chatMessageDto.setSentAt(message.getSentAt());
            return chatMessageDto;
        }).collect(Collectors.toList());
        return responseDtos;

    }

    @PostMapping("/createChat")
    public void createChat(@RequestBody RequestChatDto requestChatDto,
                           Authentication auth) {
        var user = (CustomUser) auth.getPrincipal();
        var buyerId = Long.parseLong(user.getUserIdx());
        Long sellerId = requestChatDto.getSellerId();
        Long productId = requestChatDto.getProductId();
        System.out.println("sellerId: " + sellerId+" productId: " + productId);
        chatRoomService.createChatRoom(sellerId,productId,buyerId);
    }

    @GetMapping("/chatlist")
    public List<ChatRoom> getChatList(Authentication auth) {
        var user = (CustomUser) auth.getPrincipal();
        Long userIdx = Long.parseLong(user.getUserIdx());
        return chatRoomRepository.findByChatListId(userIdx);
    }
}
