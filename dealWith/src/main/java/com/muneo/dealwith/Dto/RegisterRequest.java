package com.muneo.dealwith.Dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String nick_name;
    private String email;
    private String password;
    private String phone;
    private String location;

}
