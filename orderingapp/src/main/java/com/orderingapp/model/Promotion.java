package com.orderingapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Promotion extends BaseAuditEntity {
    private String name;

    private Integer requiredPoints;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private boolean disabled;

    @ManyToOne
    private Product product;

    @ManyToOne
    @JoinColumn
    private Offer offer;
}
