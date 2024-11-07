package com.orderingapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orderingapp.model.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion,Long> {

   Optional<Promotion> findByName(String name);
    
}
