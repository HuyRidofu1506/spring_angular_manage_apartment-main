package com.example.spring_api_manage_apartment.repo;

import com.example.spring_api_manage_apartment.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ResidentRepository extends JpaRepository<Resident, Long>, JpaSpecificationExecutor<Resident> {
    Resident findByName(String name);
    boolean existsByCccd(String cccd);
}
