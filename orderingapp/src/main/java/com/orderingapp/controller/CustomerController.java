package com.orderingapp.controller;

// import com.mcdonalds.foodordering.payload.CustomerPayload;
// import com.mcdonalds.foodordering.payload.LoginPayload;

// import java.time.LocalDate;

import org.springframework.validation.annotation.Validated;
// import org.springframework.web.bind.annotation.CrossOrigin;
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
    
}
