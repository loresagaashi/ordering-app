package com.orderingapp.model;

// import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.persistence.Entity;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class DeliveryHours extends BaseEntity {
    // @Enumerated(EnumType.STRING)
    // private DayOfWeek dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;

   
}