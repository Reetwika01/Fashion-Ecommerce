package com.example.shopping_ecommerce.validation;

import com.example.shopping_ecommerce.entity.Coupon;
import com.example.shopping_ecommerce.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class CouponValidator {

    public void validate(Coupon coupon, BigDecimal subTotal) {

        if (coupon == null) {
            throw new BadRequestException(
                    "Coupon not found."
            );
        }

        if (!coupon.getActive()) {
            throw new BadRequestException(
                    "Coupon is inactive."
            );
        }

        if (subTotal.compareTo(coupon.getMinimumAmount()) < 0) {

            throw new BadRequestException(

                    "Coupon "
                            + coupon.getCouponCode()
                            + " requires minimum purchase of ₹"
                            + coupon.getMinimumAmount()

            );

        }

    }

}