package com.orderingapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.Employee;
import com.orderingapp.service.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController extends BasicControllerOperations<EmployeeService,Employee>{

    public EmployeeController(EmployeeService service){
        super(service);
    }

}