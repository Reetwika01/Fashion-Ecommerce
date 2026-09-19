package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.response.CouponResponse;

import java.util.List;

public interface CouponService {

    List<CouponResponse> getAllCoupons();

}