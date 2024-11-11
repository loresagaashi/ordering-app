package com.orderingapp.controller;

import com.orderingapp.payload.LoginPayload;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.Customer;
import com.orderingapp.service.CustomerService;

@RestController
@RequestMapping("/customers")
public class CustomerController extends BasicControllerOperations<CustomerService, Customer>{
    public CustomerController(CustomerService service) {
        super(service);
    }

    @PostMapping("/login")
    public Customer login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }

}
