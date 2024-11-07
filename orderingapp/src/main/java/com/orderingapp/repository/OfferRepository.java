package com.orderingapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orderingapp.model.Offer;


public interface OfferRepository extends JpaRepository<Offer, Long> {
    Optional<Offer> findByName(String name);
}
