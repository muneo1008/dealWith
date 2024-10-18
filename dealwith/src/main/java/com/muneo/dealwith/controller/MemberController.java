package com.muneo.dealwith.controller;


import com.muneo.dealwith.dto.SignInRequest;
import com.muneo.dealwith.entity.Member;
import com.muneo.dealwith.jwt.JwtUtil;
import com.muneo.dealwith.repository.MemberRepository;


import com.muneo.dealwith.service.CustomUser;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {
    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @GetMapping("/checkAuth")
    public ResponseEntity<String> home(Authentication authentication) {
        if(authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("fail");
        }
    }

    @PostMapping("/signin")
    public String signup(@RequestBody SignInRequest signInRequest) {

        Member member = new Member();
        member.setUsername(signInRequest.getUsername());
        var hash = new BCryptPasswordEncoder().encode(signInRequest.getPassword());
        member.setPassword(hash);
        member.setUserEmail(signInRequest.getUserEmail());
        member.setRole("USER");
        member.setRegion(signInRequest.getRegion());
        member.setPhone(signInRequest.getPhone());


        memberRepository.save(member);

        return "가입완료";
    }

    @PostMapping("/signup")
    public String signup(@RequestBody Map<String, String> data,
                         HttpServletResponse response
    ){
        var authToken = new UsernamePasswordAuthenticationToken(data.get("username"), data.get("password"));
        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);

        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
//        System.out.println("jwt: " + jwt);

        var cookie = new Cookie("jwt",jwt);
        cookie.setMaxAge(30*60);
        cookie.setHttpOnly(false);
        cookie.setPath("/");
        cookie.setSecure(false);
        response.addCookie(cookie);

        return jwt;
    }

    @GetMapping("/my-page")
    public Map<String,Object> myPage() {
        var user = (CustomUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userName = user.getUsername();
        var userEmail = user.getUserEmail();
        var role = user.getAuthorities();
        Map<String, Object> data = new HashMap<>();
        data.put("username", userName);
        data.put("userEmail", userEmail);
        data.put("role", role);
        return data;
    }

    @PostMapping("/signout")
    public String signout(HttpServletResponse response) {

        return "로그아웃";
    }
}
