package com.muneo.dealwith.jwt;

import com.muneo.dealwith.service.CustomUser;
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
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        //쿠키의 jwt 유효성 검사
        Cookie[] cookies = request.getCookies();
        if(cookies == null) {
            filterChain.doFilter(request, response);
            return;
        }
        var jwtCookie = "";
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("jwt")) {
                jwtCookie = cookie.getValue();
            }
        }
//        System.out.println("jwt:"+jwtCookie);
        Claims claim;

        try{
            claim = JwtUtil.extractToken(jwtCookie);
//            System.out.println("claims: "+claim.toString());
        }catch (Exception e){
//            System.out.println("+===========");
            filterChain.doFilter(request, response);
            return;
        }
//        System.out.println("user: "+claim.get("username"));
        var arr = claim.get("authorities").toString().split(",");
        var authorities = Arrays.stream(arr).map(a-> new SimpleGrantedAuthority(a)).toList();
//        System.out.println("authorities: "+authorities);
        var customUser = new CustomUser(
                claim.get("username").toString(),"none", authorities
        );
//        System.out.println("email: "+claim.get("userEmail"));
//        customUser.setUserEmail(claim.get("userEmail").toString());
        customUser.userEmail = claim.get("userEmail").toString();

//        System.out.println("customUser: "+customUser);
        var authToken = new UsernamePasswordAuthenticationToken(
                customUser,""
        );

        authToken.setDetails(new WebAuthenticationDetailsSource()
                .buildDetails(request)
        );
//        System.out.println("authToken: "+authToken);
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
    }
}
