package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.request.PaymentRequest;
import com.example.shopping_ecommerce.dto.response.PaymentResponse;
import com.example.shopping_ecommerce.enums.PaymentStatus;

public interface PaymentService {

    PaymentResponse makePayment(PaymentRequest request);

    PaymentResponse getPaymentByOrder(Long orderId);

    void updatePaymentStatus(Long orderId, PaymentStatus paymentStatus);

}