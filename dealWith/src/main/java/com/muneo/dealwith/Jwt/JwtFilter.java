package com.muneo.dealwith.Jwt;

import com.muneo.dealwith.Dto.CustomUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("url: " + request.getRequestURI());
        if (request.getRequestURI().equals("/logout")) {
            filterChain.doFilter(request, response); // 로그아웃 요청은 필터를 그대로 통과
            return;
        }
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            filterChain.doFilter(request, response);
            return;
        }

        var jwtCookie = "";
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("jwt")) {
                jwtCookie = cookie.getValue();
            }
        }
//        System.out.println("check token: "+jwtCookie);

        Claims claim;
        try{
            claim = JwtUtil.extractToken(jwtCookie);
//            System.out.println("claim: "+claim);
        }catch (Exception e) {
            filterChain.doFilter(request, response);
            return;
        }

//        var arr = claim.get("authorities").toString().split(",");
//        var authorities = Arrays.stream(arr).map(a->new SimpleGrantedAuthority(a)).toList();
        List<SimpleGrantedAuthority> authorities = Arrays.stream(claim.get("authorities").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();

        var customUser = new CustomUser(
                claim.get("username").toString(),
                "none",
                authorities
        );
        customUser.userIdx = claim.get("userIdx").toString();
        customUser.userEmail = claim.get("userEmail").toString();
        customUser.nickName = claim.get("nickName").toString();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                customUser,null,authorities
        );
//        System.out.println("authToken: "+authToken);
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

//        System.out.println("authToken details: "+authToken);
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
