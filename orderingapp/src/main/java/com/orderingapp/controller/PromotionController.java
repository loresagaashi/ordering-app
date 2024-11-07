package com.orderingapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.Promotion;
import com.orderingapp.service.PromotionService;

@RestController
@RequestMapping("/promotions")
public class PromotionController extends BasicControllerOperations<PromotionService, Promotion> {

    public PromotionController(PromotionService service) {
        super(service);
    }
    
}

