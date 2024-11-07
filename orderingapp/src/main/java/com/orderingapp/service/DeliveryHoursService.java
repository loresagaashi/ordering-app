package com.orderingapp.service;



import org.springframework.stereotype.Service;

import com.orderingapp.model.DeliveryHours;
import com.orderingapp.repository.DeliveryHoursRepository;

@Service
public class DeliveryHoursService extends BasicServiceOperations<DeliveryHoursRepository, DeliveryHours>{

    public DeliveryHoursService(DeliveryHoursRepository repository) {
        super(repository);
    }

}