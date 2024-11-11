package com.orderingapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orderingapp.model.StoreLocation;

public interface StoreLocationRepository extends JpaRepository<StoreLocation,Long>{
    
    Optional<StoreLocation> findBynameOfLocation(String nameOfLocation);
}