package com.muneo.dealwith.Controller;

import com.muneo.dealwith.Dto.CustomUser;
import com.muneo.dealwith.Dto.RegisterRequest;
import com.muneo.dealwith.Jwt.JwtUtil;
import com.muneo.dealwith.Repository.MemberRepository;
import com.muneo.dealwith.Service.MemberService;


import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest registerRequest) {
        var newMember = memberService.register(registerRequest);

        return newMember+" 가입완료";
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String,String> data,
                        HttpServletResponse response) {
        var authToken = new UsernamePasswordAuthenticationToken(data.get("username"), data.get("password"));

        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);

        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
        System.out.println("token: "+jwt);


        ResponseCookie cookie = ResponseCookie.from("jwt", jwt)
                .maxAge(3600)  // 쿠키 유효 시간 (초)
                .path("/")  // 쿠키의 경로 설정
                .httpOnly(false)  // HttpOnly 설정
                .secure(true)  // HTTPS가 필요하지 않으므로 false로 설정 (로컬 환경)
                .sameSite("None")  // SameSite 설정 (None)
                .build();

        // Set-Cookie 헤더에 쿠키 추가 (HttpServletResponse의 addHeader 사용)
        response.addHeader("Set-Cookie", cookie.toString());
        System.out.println("login");

        return jwt;
    }

    @GetMapping("/checkAuth")
    public ResponseEntity<Map<String, Object>> checkAuth(Authentication auth) {
        Map<String, Object> response = new HashMap<>();

        if(auth == null) {
            System.out.println("auth is null");
            response.put("message", "Unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }else{
            var user = (CustomUser) auth.getPrincipal();
//            System.out.println("User Email: " + user.getUserEmail());
//            System.out.println("User ID: " + user.getUserIdx());
//            System.out.println("User Nickname: " + user.getNickName());
            // 사용자 정보를 응답에 추가
            response.put("userIdx", user.getUserIdx());
            response.put("email", user.getUserEmail());
            response.put("nickname", user.getNickName());
            return ResponseEntity.ok(response);
        }
    }
//    @PostMapping("/logout")
//    public ResponseEntity<String> logout(HttpServletResponse response) {
//        // JWT 쿠키를 삭제
//        var authToken = new UsernamePasswordAuthenticationToken("", "");
//
//        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
//        SecurityContextHolder.getContext().setAuthentication(auth);
//
//        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
//        System.out.println("token: "+jwt);
//        ResponseCookie cookie = ResponseCookie.from("jwt", null)  // 쿠키 이름과 값을 null로 설정
//                .path("/")  // 쿠키의 경로 설정
//                .maxAge(0)  // 쿠키의 유효 시간을 0으로 설정하여 삭제
//                .httpOnly(true)  // HttpOnly 설정
//                .secure(true)  // HTTPS가 필요하므로 true로 설정 (배포 환경에서)
//                .sameSite("None")  // SameSite 설정
//                .build();
//
//        response.addHeader("Set-Cookie", cookie.toString());
//
//        return ResponseEntity.ok("로그아웃 성공");
//    }

    @GetMapping("/test")
    public String test(Authentication auth){
        var user = (CustomUser) auth.getPrincipal();
        System.out.println("User Email: " + user.getUserEmail());
        System.out.println("User ID: " + user.getUserIdx());
        System.out.println("User Nickname: " + user.getNickName());
        return "";
    }
}
