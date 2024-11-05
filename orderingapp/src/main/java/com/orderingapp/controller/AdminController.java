package com.orderingapp.controller;



import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.orderingapp.model.Admin;
import com.orderingapp.service.AdminService;

@RestController
@RequestMapping("/admins")
public class AdminController extends BasicControllerOperations<AdminService, Admin> {
    public AdminController(AdminService service) {
        super(service);
    }

}
