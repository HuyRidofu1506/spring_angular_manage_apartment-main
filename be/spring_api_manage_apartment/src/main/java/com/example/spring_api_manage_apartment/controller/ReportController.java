package com.example.spring_api_manage_apartment.controller;

import com.example.spring_api_manage_apartment.entity.Bill;
import com.example.spring_api_manage_apartment.entity.Report;
import com.example.spring_api_manage_apartment.repo.ReportRepository;
import com.example.spring_api_manage_apartment.spec.ReportSpec;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/api/v1/reports")
public class ReportController {
    private final ReportRepository reportRepository;

    @GetMapping("/_search")
    private ResponseEntity<Page<Report>> getAll(
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("name") String name
    ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        var data = reportRepository.findAll(ReportSpec.search(name), pageable);
        return ResponseEntity.ok().body(data);
    }

    @PostMapping
    private void create(@RequestBody Report req) {
        reportRepository.save(req);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Report> get(@PathVariable("id") Long id) {
        var response = reportRepository.findById(id).orElseThrow();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{id}")
    private void update(@PathVariable("id") Long id, @RequestBody Report req) {
        var response = reportRepository.findById(id).orElseThrow();
        BeanUtils.copyProperties(req, response);
        reportRepository.save(response);
    }

    @DeleteMapping("/{id}")
    private void delete(@PathVariable("id") Long id) {
        var response = reportRepository.findById(id).orElseThrow();
        reportRepository.delete(response);
    }
}
