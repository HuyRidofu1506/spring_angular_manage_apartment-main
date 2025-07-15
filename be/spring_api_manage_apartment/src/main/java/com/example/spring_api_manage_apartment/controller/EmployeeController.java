package com.example.spring_api_manage_apartment.controller;

import com.example.spring_api_manage_apartment.entity.Employee;
import com.example.spring_api_manage_apartment.repo.EmployeeRepository;
import com.example.spring_api_manage_apartment.spec.EmployeeSpec;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    @GetMapping("/_search")
    private ResponseEntity<Page<Employee>> getAll(
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("name") String name) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Employee> residents = employeeRepository.findAll(EmployeeSpec.search(name), pageable);
        return ResponseEntity.ok().body(residents);
    }

    @PostMapping
    private ResponseEntity<?> create(@RequestBody Employee employee) {
        if (employeeRepository.existsByCccd(employee.getCccd())) {
            return ResponseEntity.status(409).body(HttpStatus.CONFLICT);
        }
        employeeRepository.save(employee);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    private ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Employee req) {
        var employee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        if (employeeRepository.existsByCccdAndIdNot(req.getCccd(), id)) {
            return ResponseEntity.status(409).body("Conflict: CCCD already exists.");
        }
        BeanUtils.copyProperties(req, employee, "id");
        employeeRepository.save(employee);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Employee> get(@PathVariable("id") Long id) {
        var employee = employeeRepository.findById(id).orElseThrow();
        return ResponseEntity.ok().body(employee);
    }

    @DeleteMapping("/{id}")
    private void delete(@PathVariable("id") Long id) {
        var employee = employeeRepository.findById(id).orElseThrow();
        employeeRepository.delete(employee);
    }
}
