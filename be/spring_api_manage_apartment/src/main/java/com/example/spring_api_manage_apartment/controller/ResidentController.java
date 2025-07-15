package com.example.spring_api_manage_apartment.controller;

import com.example.spring_api_manage_apartment.entity.Apartment;
import com.example.spring_api_manage_apartment.entity.Resident;
import com.example.spring_api_manage_apartment.repo.ResidentRepository;
import com.example.spring_api_manage_apartment.spec.ApartmentSpec;
import com.example.spring_api_manage_apartment.spec.ResidentSpec;
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

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/residents")
public class ResidentController {
    private final ResidentRepository residentRepository;

    @GetMapping("/_search")
    private ResponseEntity<Page<Resident>> getAll(
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("name") String name) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Resident> residents = residentRepository.findAll(ResidentSpec.search(name), pageable);
        return ResponseEntity.ok().body(residents);
    }

    @GetMapping
    private ResponseEntity<List<Resident>> getAll() {
        return ResponseEntity.ok().body(residentRepository.findAll());
    }

    @PostMapping
    private ResponseEntity<?> create(@RequestBody Resident resident) {
        if (residentRepository.existsByCccd(resident.getCccd())) {
            return ResponseEntity.status(409).body(HttpStatus.CONFLICT);
        }
        residentRepository.save(resident);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    private ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Resident residentReq) {
        var resident = residentRepository.findById(id).orElseThrow(() -> new RuntimeException("Resident not found"));
        if (residentRepository.existsByCccdAndIdNot(residentReq.getCccd(), id)) {
            return ResponseEntity.status(409).body("Conflict: CCCD already exists.");
        }
        BeanUtils.copyProperties(residentReq, resident, "id");
        residentRepository.save(resident);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Resident> get(@PathVariable("id") Long id) {
        var resident = residentRepository.findById(id).orElseThrow();
        return ResponseEntity.ok().body(resident);
    }

    @DeleteMapping("/{id}")
    private void delete(@PathVariable("id") Long id) {
        var resident = residentRepository.findById(id).orElseThrow();
        residentRepository.delete(resident);
    }
}
