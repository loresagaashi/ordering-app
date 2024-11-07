package com.orderingapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.City;
import com.orderingapp.service.CityService;

@RestController
@RequestMapping("/city")
public class CityController extends BasicControllerOperations<CityService, City> {
   
   public CityController(CityService service) {
      super(service);
   }

}
