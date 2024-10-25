package com.muneo.dealwith.Service;

import com.muneo.dealwith.Dto.RegisterRequest;
import com.muneo.dealwith.Entity.Member;
import com.muneo.dealwith.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    public String register(RegisterRequest registerRequest) {
        Member member = new Member();
        member.setUsername(registerRequest.getUsername());
        var hashPw = new BCryptPasswordEncoder().encode(registerRequest.getPassword());
        member.setPassword(hashPw);
        member.setEmail(registerRequest.getEmail());
        member.setPhone(registerRequest.getPhone());
        member.setNick_name(registerRequest.getNick_name());
        member.setLocation(registerRequest.getLocation());
        memberRepository.save(member);

        return member.getUsername();
    }

}
