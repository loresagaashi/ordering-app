package com.orderingapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Category extends BaseEntity {
   
   @NotBlank
   private String name;

   @ToString.Exclude
   @JsonIgnoreProperties("category")
   @OneToMany(mappedBy = "category")
   private List<Product> products;
   
}
