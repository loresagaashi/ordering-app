package com.orderingapp.service;


import org.springframework.stereotype.Service;
import com.orderingapp.model.Employee;
import com.orderingapp.repository.EmployeeRepository;


@Service
public class EmployeeService extends BasicServiceOperations<EmployeeRepository, Employee>{

    public EmployeeService(EmployeeRepository repository){
        super(repository);
    }
}
