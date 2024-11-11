package com.orderingapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.JobPosition;
import com.orderingapp.service.JobPositionService;

@RestController
@RequestMapping("/jobPositions")
public class JobPositionController extends BasicControllerOperations<JobPositionService, JobPosition>{

    public JobPositionController(JobPositionService service) {
        super(service);
    }
    
}
