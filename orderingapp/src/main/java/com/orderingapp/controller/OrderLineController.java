package com.orderingapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.service.OrderLineService;
import com.orderingapp.model.OrderLine;



@RestController
@RequestMapping("/orderLine")
public class OrderLineController extends BasicControllerOperations<OrderLineService, OrderLine>{

    public OrderLineController(OrderLineService service) {
        super(service);
    }

}