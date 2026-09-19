package com.example.shopping_ecommerce.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponResponse {

    private String couponCode;

    private Integer discountPercentage;

    private BigDecimal minimumAmount;

    private boolean active;

}