package com.orderingapp.service;

import com.orderingapp.model.StoreHours;
import com.orderingapp.repository.StoreHoursRepository;


import org.springframework.stereotype.Service;


@Service
public class StoreHoursService extends BasicServiceOperations<StoreHoursRepository, StoreHours>{

    public StoreHoursService(StoreHoursRepository repository) {
        super(repository);
    }

}