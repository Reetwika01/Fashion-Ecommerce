package com.example.shopping_ecommerce.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutResponse {

    private String customerName;

    private String address;

    private String phoneNumber;

    private String couponCode;

    private BigDecimal subTotal;

    private BigDecimal discountAmount;

    private BigDecimal finalAmount;

}