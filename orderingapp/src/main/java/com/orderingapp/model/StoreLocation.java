package com.orderingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

// import java.util.List;

// import static jakarta.persistence.CascadeType.ALL;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class StoreLocation extends BaseEntity {
    private String nameOfLocation;

    @ManyToOne
    @JoinColumn(name = "store_hours_id", foreignKey = @ForeignKey(name = "fk_store_hours_store_location", foreignKeyDefinition = "FOREIGN KEY (store_hours_id) REFERENCES store_hours(id) ON DELETE RESTRICT"))
    private StoreHours storeHours;
}