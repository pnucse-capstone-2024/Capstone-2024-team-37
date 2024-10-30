package com.pnu.pickle.auth.service;

import com.pnu.pickle.auth.dto.SignInReqDto;
import com.pnu.pickle.auth.dto.SignUpReqDto;
import com.pnu.pickle.auth.exception.DuplicateEmailException;
import com.pnu.pickle.auth.exception.DuplicateUsernameException;
import com.pnu.pickle.global.constants.SecurityConstants;
import com.pnu.pickle.global.security.provider.PickleUsernamePwdAuthenticationProvider;
import com.pnu.pickle.group.entity.Group;
import com.pnu.pickle.group.entity.GroupMembership;
import com.pnu.pickle.group.service.GroupService;
import com.pnu.pickle.user.dao.UserRepository;
import com.pnu.pickle.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final GroupService groupService;
    private final EmailAuthService emailAuthService;
    private final PickleUsernamePwdAuthenticationProvider pickleUsernamePwdAuthenticationProvider;

    private static String defaultUserImage = "https://pickle-avatar.s3.amazonaws.com/bluee.svg";

    @Transactional
    public Long signUp(SignUpReqDto signUpReqDto) {
            // 임시로 주석 처리
//        if(!emailAuthService.checkValidAuthCodeFromServer()){
//            throw new InvalidAuthCodeFromServerException("Invalid Code.. Try again");
//        }

        if (emailAuthService.checkEmailDuplication(signUpReqDto.getEmail())) {
            throw new DuplicateEmailException("email already exist");
        }

        if (userRepository.existsByUsername(signUpReqDto.getUsername())) {
            throw new DuplicateUsernameException("username already exist");
        }

        String encodedPassword = passwordEncoder.encode(signUpReqDto.getPassword());

        User user = User.createUser(
                signUpReqDto.getUsername(),
                signUpReqDto.getEmail(),
                encodedPassword,
                defaultUserImage
        );

        userRepository.save(user);

        Group defaultGroup = groupService.createDefaultGroup(user);

        return defaultGroup.getId();
    }

    public String signIn(SignInReqDto signInReqDto) {
        String email = signInReqDto.getEmail();
        String pwd = signInReqDto.getPassword();
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(email, pwd);
        Authentication authenticationResponse = pickleUsernamePwdAuthenticationProvider.authenticate(authentication);

        //jwt 발급
        String jwt = "";
        if (null != authenticationResponse && authenticationResponse.isAuthenticated()) {

            SecretKey secretKey = Keys.hmacShaKeyFor(SecurityConstants.JWT_KEY.getBytes(StandardCharsets.UTF_8));
            jwt = Jwts.builder().issuer("Pickle").subject("JWT Token")
                    .claim("username", authenticationResponse.getName())
                    .issuedAt(new java.util.Date())
                    .expiration(new java.util.Date((new java.util.Date()).getTime() + 30000000))
                    .signWith(secretKey).compact();

        }
        return jwt;
    }

    public User getUserByToken(HttpServletRequest request) {
        String jwt = request.getHeader(SecurityConstants.JWT_HEADER);
        SecretKey key = Keys.hmacShaKeyFor(
                SecurityConstants.JWT_KEY.getBytes(StandardCharsets.UTF_8));
        Claims claims = Jwts.parser()
                .verifyWith(key) //
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
        System.out.println("ADFADS");
        String username = String.valueOf(claims.get("username"));

        return userRepository.findByUsername(username);
    }

    public GroupMembership getUserGroupMembershipByToken(HttpServletRequest request, Long groupId) {
        User user = getUserByToken(request);
        return groupService.getUserGroupMembership(user, groupId);
    }

    public GroupMembership getUserGroupMembershipByUsername(String username, Long groupId) {
        return groupService.getUserGroupMembershipByUsername(username, groupId);
    }
}
