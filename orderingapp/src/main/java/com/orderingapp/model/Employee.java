package com.orderingapp.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Employee extends BaseEntity {

    private String firstName;

    private String lastName;

    @ManyToOne
    @JoinColumn(name = "job_position_id", nullable = false, foreignKey = @ForeignKey(name = "fk_employee_job_position", foreignKeyDefinition = "FOREIGN KEY (job_position_id) REFERENCES job_position(id) ON DELETE RESTRICT"))
    private JobPosition jobPosition;

    @ManyToOne
    @JoinColumn(name = "store_location_id", nullable = false, foreignKey = @ForeignKey(name = "fk_employee_store_location", foreignKeyDefinition = "FOREIGN KEY (store_location_id) REFERENCES store_location(id) ON DELETE RESTRICT"))
    private StoreLocation storeLocation;
}