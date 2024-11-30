package com.example.spring_api_manage_apartment.spec;

import com.example.spring_api_manage_apartment.entity.Employee;
import com.example.spring_api_manage_apartment.entity.Resident;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@UtilityClass
public class EmployeeSpec {
    public Specification<Employee> search(String name) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (!StringUtils.isEmpty(name)) {
                predicates.add(cb.like(cb.upper(root.get("name")), "%" + name + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
