package com.orderingapp.controller;

// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.Offer;
import com.orderingapp.service.OfferService;


@RestController
@RequestMapping("/offers")
public class OfferController extends BasicControllerOperations<OfferService, Offer>{

    public OfferController(OfferService service) {
        super(service);
    }
    
}
