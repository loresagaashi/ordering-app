package com.orderingapp.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.orderingapp.model.Admin;
import com.orderingapp.repository.AdminRepository;

import java.util.Optional;

@Service
public class AdminService extends BasicServiceOperations<AdminRepository, Admin> {

    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository repository, PasswordEncoder passwordEncoder) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Admin> findByEmail(String email) {
        return this.repository.findByEmail(email);
    }

    @Override
    public Admin save(Admin entity) {
        if (entity.getId() == null) {
            entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        }

        return super.save(entity);
    }

}