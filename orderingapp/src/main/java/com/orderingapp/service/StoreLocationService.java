package com.orderingapp.service;

import org.springframework.stereotype.Service;

import com.orderingapp.model.StoreLocation;
import com.orderingapp.repository.StoreLocationRepository;

@Service
public class StoreLocationService extends BasicServiceOperations<StoreLocationRepository, StoreLocation>{

    public StoreLocationService(StoreLocationRepository repository){
        super(repository);
    }
}