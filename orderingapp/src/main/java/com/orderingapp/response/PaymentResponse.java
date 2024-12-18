package com.orderingapp.response;

public class PaymentResponse {

    private String payment_url;
    private String message;

    public PaymentResponse() {}

    public PaymentResponse(String message) {
        this.message = message;
    }

    public String getPayment_url() {
        return payment_url;
    }

    public void setPayment_url(String payment_url) {
        this.payment_url = payment_url;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
