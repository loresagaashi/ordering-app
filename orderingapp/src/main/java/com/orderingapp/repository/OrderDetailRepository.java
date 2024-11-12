package com.orderingapp.repository;

import com.orderingapp.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.orderingapp.model.OrderDetail;

// import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
// import java.util.Date;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long>{
    @Query(
        "SELECT o FROM OrderDetail o "+
        "LEFT JOIN o.customer c "+
        "WHERE (?1 = '' OR LOWER(c.firstName) LIKE %?1% OR LOWER(c.lastName) LIKE %?1%) " +
        "AND o.dateTime BETWEEN ?2 AND ?3 "+
        "AND o.status = ?4 "+
        "ORDER BY o.dateTime"
    )
    List<OrderDetail> findByDateTimeBetweenAndStatus(String customer, ZonedDateTime from, ZonedDateTime to, OrderStatus statusType);
    
    //Kur tshtohen punetort
    // List<Offer> findByDateTimeIsAfterAndStatusOfferLines_Emplyee_IdIn(ZonedDateTime dateTime, OrderStatus statusType, Set<Long> employeeIds);
}

