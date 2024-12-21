package com.orderingapp.controller;


import com.orderingapp.payload.LoginPayload;
import com.orderingapp.model.Admin;
import com.orderingapp.service.AdminService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
public class AdminController extends BasicControllerOperations<AdminService, Admin> {
    public AdminController(AdminService service) {
        super(service);
    }

    @PostMapping("/login")
    public Admin login(@RequestBody @Validated LoginPayload login) {
        return this.service.login(login.getEmail(), login.getPassword());
    }
}
