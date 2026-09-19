package com.example.shopping_ecommerce.repository;

import com.example.shopping_ecommerce.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Optional<Coupon> findByCouponCode(String couponCode);

}