package com.muneo.dealwith.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {
    private String username;
    private String userEmail;
    private String password;
    private String region;
    private String phone;
    private String role;
}
