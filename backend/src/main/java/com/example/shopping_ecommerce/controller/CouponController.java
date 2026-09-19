package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.response.CouponResponse;
import com.example.shopping_ecommerce.service.CouponService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
@Tag(name = "Coupons", description = "Coupon APIs")
public class CouponController {

    private final CouponService couponService;

    @GetMapping
    @Operation(summary = "Get Available Coupons")
    public ResponseEntity<List<CouponResponse>> getAllCoupons() {

        return ResponseEntity.ok(
                couponService.getAllCoupons()
        );

    }

}