package com.orderingapp.controller;

import com.orderingapp.model.OrderDetail;
import com.orderingapp.response.PaymentResponse;
import com.orderingapp.service.OrderDetailService;
import com.orderingapp.service.PaymentService;
import com.stripe.exception.StripeException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping("/create-link")
    public ResponseEntity<PaymentResponse> createPaymentLink(@RequestBody OrderDetail orderDetail) throws StripeException {
        PaymentResponse paymentResponse = paymentService.createPaymentLink(orderDetail);
        if (paymentResponse.getPayment_url() == null) {
            return ResponseEntity.status(500).body(paymentResponse);
        }
        return ResponseEntity.ok(paymentResponse);
    }

    @PostMapping("/confirm-payment")
    public ResponseEntity<String> confirmPayment(@RequestBody OrderDetail orderDetail) {
        // Save the order after successful payment
        orderDetailService.save(orderDetail);
        return ResponseEntity.ok("Order saved successfully");
    }
}
