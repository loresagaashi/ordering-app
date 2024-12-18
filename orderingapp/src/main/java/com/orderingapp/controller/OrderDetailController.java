package com.orderingapp.controller;

import java.time.LocalDate;
// import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orderingapp.model.OrderDetail;
import com.orderingapp.service.OrderDetailService;
import com.orderingapp.service.PaymentService;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@RestController
@RequestMapping("/orderDetail")
public class OrderDetailController extends BasicControllerOperations<OrderDetailService, OrderDetail>{

    public OrderDetailController(OrderDetailService service) {
        super(service);
    }

   private PaymentService paymentService;

    @GetMapping("/all/{status}")
    public Map<LocalDate, List<OrderDetail>> findByDateTimeBetweenAndStatus(@PathVariable String status,
                                                                            @RequestParam(required = false) String customer,
                                                                            @RequestParam @DateTimeFormat(iso = DATE_TIME) ZonedDateTime from,
                                                                            @RequestParam @DateTimeFormat(iso = DATE_TIME) ZonedDateTime to) {
                    return service.findAllByDateBetweenAndStatus(customer, from, to, status);
                                                                            }

    @PutMapping("/in-progress")
    public OrderDetail moveToProgress(@RequestBody OrderDetail orderDetail) {
        return service.moveToProgress(orderDetail);
    }

    @PutMapping("/processing")
    public OrderDetail moveToProcessing(@RequestBody OrderDetail orderDetail) {
        return service.moveToProcessing(orderDetail);
    }

    @PutMapping("/delivering")
    public OrderDetail moveToDelivering(@RequestBody OrderDetail orderDetail) {
        return service.moveToDelivering(orderDetail);
    }

    @PutMapping("/completed")
    public OrderDetail moveToCompleted(@RequestBody OrderDetail orderDetail) {
        return service.moveToCompleted(orderDetail);
    }
}
