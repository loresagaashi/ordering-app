package com.orderingapp.service;

import com.orderingapp.model.OrderDetail;
import com.orderingapp.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    
    public PaymentResponse createPaymentLink(OrderDetail order) throws StripeException;
}
