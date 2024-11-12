package com.orderingapp.config;

import com.orderingapp.model.Admin;
import com.orderingapp.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@RequiredArgsConstructor
@Component
public class AppStart {
    private final AdminService adminService;

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        Admin user = new Admin();
        user.setFirstName("Admin");
        user.setLastName("Admin");
        user.setEmail("admin@gmail.com");
        user.setPassword("admin");
        user.setBirthDate(LocalDate.of(2004, 5, 17));
        user.setPhoneNumber("123456789");

        adminService.findByEmail(user.getEmail()).orElseGet(() -> adminService.save(user));
    }
}