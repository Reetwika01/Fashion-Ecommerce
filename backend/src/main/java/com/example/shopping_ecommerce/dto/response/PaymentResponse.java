package com.example.shopping_ecommerce.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private Long paymentId;

    private Long orderId;

    private BigDecimal amount;

    private String transactionId;

    private String paymentMethod;

    private String paymentStatus;

    private LocalDateTime paymentDate;

}