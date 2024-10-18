package com.muneo.dealwith.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class GcsRequest {
    private String name;
    private MultipartFile file;
}
