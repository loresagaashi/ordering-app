package com.orderingapp.controller;


import com.orderingapp.model.StoreHours;
import com.orderingapp.service.StoreHoursService;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/storeHours")
public class StoreHoursController extends BasicControllerOperations<StoreHoursService, StoreHours> {
   
   public StoreHoursController(StoreHoursService service){
    super(service);
   }
   
}