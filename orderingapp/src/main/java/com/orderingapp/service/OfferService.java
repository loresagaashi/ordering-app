package com.orderingapp.service;

import org.springframework.stereotype.Service;

import com.orderingapp.model.Offer;
import com.orderingapp.repository.OfferRepository;

@Service
public class OfferService extends BasicServiceOperations<OfferRepository, Offer>{

    public OfferService(OfferRepository repository) {
        super(repository);
    }
    
}
