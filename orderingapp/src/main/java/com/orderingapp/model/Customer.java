package com.orderingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Customer extends UserAccount {

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer totalBonusPoints = 0;

    @ManyToMany
    @JoinTable(name = "customer_products",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> favorites;

    // @OneToOne
    // @JoinColumn
    // private Address address;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = true, foreignKey = @ForeignKey(name = "fk_customer_city", foreignKeyDefinition = "FOREIGN KEY (city_id) REFERENCES City(id) ON DELETE RESTRICT"))
    private City city;

    @Transient
    private String type = "Customer";
}