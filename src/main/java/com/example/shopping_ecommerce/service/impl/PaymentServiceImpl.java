package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.dto.request.PaymentRequest;
import com.example.shopping_ecommerce.dto.response.PaymentResponse;
import com.example.shopping_ecommerce.entity.Order;
import com.example.shopping_ecommerce.entity.Payment;
import com.example.shopping_ecommerce.enums.PaymentStatus;
import com.example.shopping_ecommerce.exception.ResourceNotFoundException;
import com.example.shopping_ecommerce.repository.OrderRepository;
import com.example.shopping_ecommerce.repository.PaymentRepository;
import com.example.shopping_ecommerce.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    private final OrderRepository orderRepository;

    @Override
    public PaymentResponse makePayment(PaymentRequest request) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id : "
                                        + request.getOrderId()
                        ));

        if (paymentRepository.findByOrder(order).isPresent()) {

            throw new IllegalStateException(
                    "Payment already exists for this order."
            );

        }

        Payment payment = Payment.builder()
                .order(order)
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(
                        request.getPaymentMethod().name().equals("COD")
                                ? PaymentStatus.PENDING
                                : PaymentStatus.SUCCESS
                )
                .amount(order.getFinalAmount())
                .transactionId(generateTransactionId())
                .build();

        payment = paymentRepository.save(payment);

        return mapToResponse(payment);

    }

    @Override
    public PaymentResponse getPaymentByOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id : " + orderId
                        ));

        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found."
                        ));

        return mapToResponse(payment);

    }

        @Override
    public void updatePaymentStatus(Long orderId, PaymentStatus paymentStatus) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id : " + orderId
                        ));

        Payment payment = paymentRepository.findByOrder(order)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found."
                        ));

        payment.setPaymentStatus(paymentStatus);

        paymentRepository.save(payment);

    }

    /**
     * Generate Unique Transaction Id
     */
    private String generateTransactionId() {

    return "TXN-"
            + LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE)
            + "-"
            + UUID.randomUUID()
                    .toString()
                    .replace("-", "")
                    .substring(0, 10)
                    .toUpperCase();
    } 

    /**
     * Convert Payment Entity to PaymentResponse
     */
    private PaymentResponse mapToResponse(Payment payment) {

        return PaymentResponse.builder()

                .paymentId(payment.getId())

                .orderId(payment.getOrder().getId())

                .amount(payment.getAmount())

                .transactionId(payment.getTransactionId())

                .paymentMethod(payment.getPaymentMethod().name())

                .paymentStatus(payment.getPaymentStatus().name())

                .paymentDate(payment.getPaymentDate())

                .build();

    }

}