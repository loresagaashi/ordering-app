package com.orderingapp.model;

import jakarta.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class City extends BaseEntity {
   
   private String name;
   
}
