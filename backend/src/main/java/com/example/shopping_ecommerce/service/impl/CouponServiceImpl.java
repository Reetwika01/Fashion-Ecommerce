package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.dto.response.CouponResponse;
import com.example.shopping_ecommerce.entity.Coupon;
import com.example.shopping_ecommerce.repository.CouponRepository;
import com.example.shopping_ecommerce.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    @Override
    public List<CouponResponse> getAllCoupons() {

        return couponRepository.findAll()
                .stream()
                .map(this::mapToCouponResponse)
                .toList();

    }

    /**
     * Convert Coupon Entity to CouponResponse
     */
    private CouponResponse mapToCouponResponse(Coupon coupon) {

        return CouponResponse.builder()
                .couponCode(coupon.getCouponCode())
                .discountPercentage(coupon.getDiscountPercentage())
                .minimumAmount(coupon.getMinimumAmount())
                .active(coupon.getActive())
                .build();

    }

}