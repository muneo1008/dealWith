package com.muneo.dealwith.Service;


import com.muneo.dealwith.Dto.CustomUser;
import com.muneo.dealwith.Dto.RequestChatDto;
import com.muneo.dealwith.Entity.ChatRoom;
import com.muneo.dealwith.Repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public ChatRoom createChatRoom(Long sellerId, Long productId, Long buyerId) {


        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setBuyerId(buyerId);
        chatRoom.setSellerId(sellerId);
        chatRoom.setProductId(productId);

        return chatRoomRepository.save(chatRoom);
    }

}
