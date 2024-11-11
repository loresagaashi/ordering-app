package com.orderingapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.StoreLocation;
import com.orderingapp.service.StoreLocationService;

@RestController
@RequestMapping("/storeLocations")
public class StoreLocationController extends BasicControllerOperations<StoreLocationService, StoreLocation>{

    public StoreLocationController(StoreLocationService service) {
        super(service);
    }
    
}