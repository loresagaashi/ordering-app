package com.orderingapp.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.orderingapp.exception.EntityValidationException;
import com.orderingapp.model.Customer;
import com.orderingapp.repository.CustomerRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CustomerService extends BasicServiceOperations<CustomerRepository,Customer>{
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository repository, PasswordEncoder passwordEncoder) {
        super(repository);
        this.passwordEncoder = passwordEncoder;
    }
    @Override
  public Customer save(Customer entity) {
    if (entity.getId() == null) {
       entity.setPassword(passwordEncoder.encode(entity.getPassword()));
    } else {
        Customer user = repository.findById(entity.getId())
          .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
      entity.setPassword(user.getPassword());
    }

    return super.save(entity);
  }

}