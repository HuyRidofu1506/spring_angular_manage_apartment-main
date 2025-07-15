package com.example.spring_api_manage_apartment.spec;

import com.example.spring_api_manage_apartment.entity.Apartment;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.Predicate;
import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


@UtilityClass
public class ApartmentSpec {
    public Specification<Apartment> search(String residentName) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (!StringUtils.isEmpty(residentName)) {
                predicates.add(cb.like(cb.upper(root.get("residentName")), "%" + residentName + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
