package com.muneo.dealwith.Service;

import com.muneo.dealwith.Entity.ChatMessage;
import com.muneo.dealwith.Entity.ChatRoom;
import com.muneo.dealwith.Repository.ChatMessageRepository;
import com.muneo.dealwith.Repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public ChatMessage sendMessage(Long chatRoomId, Long senderId, String message) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new IllegalArgumentException("Chat room not found"));

        ChatMessage chatMessage = new ChatMessage(chatRoom, senderId, message);
        return chatMessageRepository.save(chatMessage);
    }
}
