package com.orderingapp.service;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.stream.Collectors;

import com.orderingapp.model.Customer;
import com.orderingapp.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import com.orderingapp.model.OrderDetail;
import com.orderingapp.model.OrderStatus;
import com.orderingapp.repository.OrderDetailRepository;

@Service
public class OrderDetailService extends BasicServiceOperations<OrderDetailRepository, OrderDetail>{

    private final CustomerRepository customerRepository;

    public OrderDetailService(OrderDetailRepository orderDetailRepository, CustomerRepository customerRepository){
        super(orderDetailRepository);
        this.customerRepository = customerRepository;
    }

    @Override
    public OrderDetail save(OrderDetail orderDetail) {
        if(orderDetail.getCustomer() != null) {
            int totalBonusPoints = orderDetail.getLines().stream()
                    .mapToInt(line -> Optional.ofNullable(line.getProduct().getBonusPoints()).orElse(0) * line.getQuantity().intValue())
                    .sum();

            Customer customer = orderDetail.getCustomer();

            customer.setTotalBonusPoints(customer.getTotalBonusPoints() + totalBonusPoints);

            customerRepository.save(customer);
        }

        return super.save(orderDetail);
    }


    public OrderDetail moveToProgress(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.IN_PROGRESS);
        orderDetail.setStartDateTime(ZonedDateTime.now());

        return save(orderDetail);
    }

    public OrderDetail moveToProcessing(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.PROCESSING);
        orderDetail.setEndDateTime(ZonedDateTime.now());

        return save(orderDetail);
    }

    public OrderDetail moveToDelivering(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.DELIVERING);
        orderDetail.setEndDateTime(ZonedDateTime.now());

        return save(orderDetail);
    }

    public OrderDetail moveToCompleted(OrderDetail orderDetail) {
        orderDetail.setStatus(OrderStatus.COMPLETED);
        orderDetail.setEndDateTime(ZonedDateTime.now());

        return save(orderDetail);
    }
    public Map<LocalDate, List<OrderDetail>> findAllByDateBetweenAndStatus(String customer, ZonedDateTime from, ZonedDateTime to, String status){
        if (customer == null) {
            customer = "";
        }
        return repository.findByDateTimeBetweenAndStatus(customer.trim().toLowerCase(), from, to, OrderStatus.valueOf(status))
        .stream()
        .collect(Collectors.groupingBy(x -> x.getDateTime().toLocalDate(), TreeMap::new, Collectors.toList()));
    }
}