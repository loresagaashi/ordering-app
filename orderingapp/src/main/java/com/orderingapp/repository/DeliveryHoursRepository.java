package com.orderingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

import com.orderingapp.model.DeliveryHours;


// import java.time.DayOfWeek;
// import java.time.LocalTime;
// import java.util.List;

public interface DeliveryHoursRepository extends JpaRepository<DeliveryHours, Long> {
    // List<DeliveryHours> findByStoreId(Long storeHoursId);
    
    // List<DeliveryHours> findByDayOfWeekAndStoreId(DayOfWeek dayOfWeek, Long storeHoursId);

    default DeliveryHours getDeliveryHoursById(Long id) {
        return findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery hours not found with id: " + id));
    }
    // @Query("SELECT dh FROM DeliveryHours dh " +
    //        "JOIN dh.storeHours sh " +
    //        "WHERE dh.dayOfWeek = :dayOfWeek " +
    //        "AND sh.Id = :Id " +
    //        "AND :currentTime BETWEEN dh.startTime AND dh.endTime")
    // List<DeliveryHours> findDeliveryHoursByDayOfWeekAndStoreId(
    //     @Param("dayOfWeek") DayOfWeek dayOfWeek,
    //     @Param("Id") Long Id,
    //     @Param("currentTime") LocalTime currentTime
    // );
    
  
}
