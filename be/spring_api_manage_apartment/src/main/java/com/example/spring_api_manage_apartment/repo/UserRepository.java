package com.example.spring_api_manage_apartment.repo;

import com.example.spring_api_manage_apartment.entity.Resident;
import com.example.spring_api_manage_apartment.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsernameAndPassword(String username, String password);
}
