package com.orderingapp.model;

import com.orderingapp.validation.group.Update;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.groups.ConvertGroup;
import jakarta.validation.groups.Default;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.EAGER;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class OrderDetail extends BaseEntity {
    private String notes;

    private BigDecimal total;

    private ZonedDateTime dateTime;

    private ZonedDateTime startDateTime;

    private ZonedDateTime endDateTime;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

   // @Enumerated(EnumType.STRING)
   // private package com.orderingapp.model.PaymentType paymentType;

    @Valid
    @ConvertGroup(from = Update.class, to = Default.class)
    @OneToMany(orphanRemoval = true, cascade = ALL, fetch = EAGER)
    @JoinColumn(name = "order_detail_id", nullable = false)
    private List<OrderLine> lines;

    @ManyToOne
    @JoinColumn
    private Customer customer;

    private String address;

    private String city;

    @PrePersist
    @PreUpdate
    private void adjustDates() {
        if (this.dateTime != null) {
            this.dateTime = this.dateTime.withZoneSameInstant(ZoneId.of("UTC"));
        }
        if (this.startDateTime != null) {
            this.startDateTime = this.startDateTime.withZoneSameInstant(ZoneId.of("UTC"));
        }
        if (this.endDateTime != null) {
            this.endDateTime = this.endDateTime.withZoneSameInstant(ZoneId.of("UTC"));
        }
    }
}
