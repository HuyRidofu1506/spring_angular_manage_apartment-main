package com.example.spring_api_manage_apartment.controller;

import com.example.spring_api_manage_apartment.entity.Apartment;
import com.example.spring_api_manage_apartment.entity.Bill;
import com.example.spring_api_manage_apartment.repo.ApartmentRepository;
import com.example.spring_api_manage_apartment.repo.ResidentRepository;
import com.example.spring_api_manage_apartment.spec.ApartmentSpec;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
@RequestMapping("/api/v1/apartments")
public class ApartmentController {
    private final ApartmentRepository apartmentRepository;
    private final ResidentRepository residentRepository;

    @GetMapping("/_search")
    private ResponseEntity<Page<Apartment>> getAll(
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("resident_name") String residentName) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("numberOfApartment").descending());
        Page<Apartment> apartments = apartmentRepository.findAll(ApartmentSpec.search(residentName), pageable);
        return ResponseEntity.ok().body(apartments);
    }

    @GetMapping
    private ResponseEntity<List<Apartment>> getAll() {
        return ResponseEntity.ok().body(apartmentRepository.findAll());
    }

    @PostMapping
    private ResponseEntity<?> create(@RequestBody Apartment apartment) {
        if (apartmentRepository.existsByNumberOfApartment(apartment.getNumberOfApartment())) {
            return ResponseEntity.status(409).body(HttpStatus.CONFLICT);
        }
        var resident = residentRepository.findByName(apartment.getResidentName());
        apartment.setResident(resident);
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    private ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Apartment apartmentReq) {

        var apartment = apartmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Apartment not found"));

        if (apartmentRepository.existsByNumberOfApartmentAndIdNot(apartmentReq.getNumberOfApartment(), id)) {
            return ResponseEntity.status(409).body("Conflict: Number of apartment already exists.");
        }
        BeanUtils.copyProperties(apartmentReq, apartment, "id");
        apartmentRepository.save(apartment);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Apartment> get(@PathVariable("id") Long id) {
        var apartment = apartmentRepository.findById(id).orElseThrow();
        return ResponseEntity.ok().body(apartment);
    }

    @DeleteMapping("/{id}")
    private void delete(@PathVariable("id") Long id) {
        var apartment = apartmentRepository.findById(id).orElseThrow();
        apartmentRepository.delete(apartment);
    }
}
