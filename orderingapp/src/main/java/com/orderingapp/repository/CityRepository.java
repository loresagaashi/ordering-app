package com.orderingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orderingapp.model.City;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City,Long> {

   Optional<City> findByName(String name);

}
