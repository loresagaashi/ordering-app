package com.orderingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Offer extends BaseAuditEntity {
    private String name;

    private BigDecimal price;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private boolean disabled;

    @ManyToMany
    @JoinTable(name = "offer_product",
               joinColumns = @JoinColumn(name = "offer_id"),
               inverseJoinColumns = @JoinColumn(name = "product_id"),
               foreignKey = @ForeignKey(name = "fk_offer_product_offer", 
               foreignKeyDefinition = "FOREIGN KEY (offer_id) REFERENCES Offer(id) ON DELETE RESTRICT"),
               inverseForeignKey = @ForeignKey(name = "fk_offer_product_product", 
               foreignKeyDefinition = "FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE RESTRICT"))
    private List<Product> products;

    private Integer bonusPoints;

    private String imageUrl;

    private String description;
}
