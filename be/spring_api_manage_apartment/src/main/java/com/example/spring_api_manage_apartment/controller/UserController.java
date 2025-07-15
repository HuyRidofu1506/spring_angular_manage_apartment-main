package com.example.spring_api_manage_apartment.controller;

import com.example.spring_api_manage_apartment.entity.User;
import com.example.spring_api_manage_apartment.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/login")
public class UserController {
    private final UserRepository userRepository;
    @PostMapping
    public ResponseEntity<?> login(@RequestBody User user) {
        if (!userRepository.existsByUsernameAndPassword(user.getUsername(), user.getPassword())) {
            return ResponseEntity.status(401).body(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok().body(Boolean.TRUE);
    }
}
