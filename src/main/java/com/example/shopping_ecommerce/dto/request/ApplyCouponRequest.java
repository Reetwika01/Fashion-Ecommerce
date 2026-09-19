package com.example.shopping_ecommerce.dto.request;

import com.example.shopping_ecommerce.enums.CouponType;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplyCouponRequest {

    @NotNull(message = "Coupon code is required")
    private CouponType couponCode;

}