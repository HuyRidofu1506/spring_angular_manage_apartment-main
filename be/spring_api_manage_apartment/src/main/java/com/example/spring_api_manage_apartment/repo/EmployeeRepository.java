package com.example.spring_api_manage_apartment.repo;

import com.example.spring_api_manage_apartment.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {
    boolean existsByCccd(String cccd);
    boolean existsByCccdAndIdNot(String cccd, Long id);
}
