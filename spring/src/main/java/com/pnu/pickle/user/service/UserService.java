package com.pnu.pickle.user.service;

import com.pnu.pickle.user.dao.UserRepository;
import com.pnu.pickle.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getMemberByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getMemberByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Boolean checkMemberExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Boolean checkMemberExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User editMember() {
//        return memberRepository.findByEmail(email);
        return null;
    }
}
