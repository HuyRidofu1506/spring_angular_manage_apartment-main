package com.example.spring_api_manage_apartment.repo;

import com.example.spring_api_manage_apartment.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ApartmentRepository extends JpaRepository<Apartment, Long>, JpaSpecificationExecutor<Apartment> {
    boolean existsByNumberOfApartment(int numberOfApartment);
}
