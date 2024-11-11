package com.orderingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.orderingapp.model.StoreHours;

    public interface StoreHoursRepository extends JpaRepository<StoreHours, Long>{

    //  Optional<StoreHours> findStoreHoursByStoreId(Long id);

}

