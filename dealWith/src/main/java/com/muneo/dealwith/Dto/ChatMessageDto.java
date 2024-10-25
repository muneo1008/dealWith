package com.muneo.dealwith.Dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageDto {
    private Long senderId;
    private String message;
    private Long chatRoomId;
    private LocalDateTime sentAt;
}
