package com.orderingapp.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.orderingapp.model.OrderDetail;
import com.orderingapp.response.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Override
    public PaymentResponse createPaymentLink(OrderDetail order) {
        Stripe.apiKey = stripeSecretKey;

        BigDecimal totalAmount = order.getTotal();
        long amountInCents = totalAmount.multiply(BigDecimal.valueOf(100)).longValueExact();

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment/success?orderId=" + order.getId())
                .setCancelUrl("http://localhost:3000/payment/failed")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amountInCents)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("McDonalds Order")
                                        .build())
                                .build())
                        .build())
                .build();

        try {
            Session session = Session.create(params);
            PaymentResponse response = new PaymentResponse();
            response.setPayment_url(session.getUrl());
            return response;
        } catch (StripeException e) {
            e.printStackTrace();
            return new PaymentResponse("Failed to create payment link due to: " + e.getMessage());
        }
    }
}
