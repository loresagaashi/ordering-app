package com.orderingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orderingapp.model.OrderLine;


public interface OrderLineRepository extends JpaRepository<OrderLine, Long>{

}