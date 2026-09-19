package com.example.shopping_ecommerce.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private Long orderId;

    private String orderNumber;

    private String customerName;

    private String phoneNumber;

    private String address;

    private List<CartItemResponse> products;

    private BigDecimal subTotal;

    private BigDecimal discountAmount;

    private BigDecimal finalAmount;

    private String couponCode;

    private String orderStatus;

    private String paymentStatus;

    private LocalDateTime orderDate;

}