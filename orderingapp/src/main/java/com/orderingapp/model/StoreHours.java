package com.orderingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.DayOfWeek;
import java.time.LocalTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class StoreHours extends BaseEntity {
    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    private LocalTime startTime;

    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(
        name = "delivery_hours_id", 
        nullable = false, 
        foreignKey = @ForeignKey(
            name = "fk_storeHours_deliveryHours", 
            foreignKeyDefinition = "FOREIGN KEY (delivery_hours_id) REFERENCES delivery_hours(id) ON DELETE RESTRICT"
        )
    )
    private DeliveryHours deliveryHours;
}
