package com.example.spring_api_manage_apartment.controller;

import com.example.spring_api_manage_apartment.entity.Bill;
import com.example.spring_api_manage_apartment.repo.BillRepository;
import com.example.spring_api_manage_apartment.spec.BillSpec;
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
@RequestMapping("/api/v1/bills")
public class BillController {
    private final BillRepository billRepository;

    @GetMapping("/_search")
    private ResponseEntity<Page<Bill>> getAll(
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("codeBill") String codeBill
    ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        var data = billRepository.findAll(BillSpec.search(codeBill), pageable);
        return ResponseEntity.ok().body(data);
    }

    @PostMapping
    private void create(@RequestBody Bill req) {
        int randomNum = (int)(Math.random() * 10000);
        req.setCodeBill("HD #" + randomNum);
        req.setTotal(getTotal(req));
        billRepository.save(req);
    }

    @PutMapping("/{id}")
    private void update(@PathVariable("id") Long id, @RequestBody Bill req) {
        var response = billRepository.findById(id).orElseThrow();
        BeanUtils.copyProperties(req, response);
        response.setTotal(getTotal(req));
        billRepository.save(response);
    }

    @GetMapping("/{id}")
    private ResponseEntity<Bill> get(@PathVariable("id") Long id) {
        var response = billRepository.findById(id).orElseThrow();
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    private void delete(@PathVariable("id") Long id) {
        var response = billRepository.findById(id).orElseThrow();
        billRepository.delete(response);
    }

    private long getTotal(Bill req) {
        var totalElectric = req.getNumberElectric() * 3500;
        var totalWater = req.getNumberWater() * 6000;
        var totalToilet = req.getToiletMoney();
        return (totalElectric + totalWater + totalToilet);
    }
}
