package com.orderingapp.controller;

import org.springframework.web.bind.annotation.*;

import com.orderingapp.model.DeliveryHours;
import com.orderingapp.service.DeliveryHoursService;

@RestController
@RequestMapping("/deliveryHours")
public class DeliveryHoursController extends BasicControllerOperations<DeliveryHoursService, DeliveryHours>{

    public DeliveryHoursController(DeliveryHoursService service) {
        super(service);
        
    }

}
