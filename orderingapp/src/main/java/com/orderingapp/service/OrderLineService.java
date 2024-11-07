package com.orderingapp.service;
import org.springframework.stereotype.Service;

import com.orderingapp.model.OrderLine;
import com.orderingapp.repository.OrderLineRepository;



@Service
public class OrderLineService extends BasicServiceOperations<OrderLineRepository, OrderLine>{

    public OrderLineService(OrderLineRepository repository) {
        super(repository);
    }
}