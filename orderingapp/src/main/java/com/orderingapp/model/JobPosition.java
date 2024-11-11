package com.orderingapp.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class JobPosition extends BaseEntity{

    private String name;

    private BigDecimal salary;
}
