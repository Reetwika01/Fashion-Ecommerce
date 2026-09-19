package com.example.shopping_ecommerce.validation;

import com.example.shopping_ecommerce.exception.BadRequestException;
import org.springframework.stereotype.Component;

@Component
public class PhoneValidator {

    private static final String PHONE_REGEX =
            "^[6-9]\\d{9}$";

    public void validate(String phoneNumber) {

        if (phoneNumber == null || phoneNumber.isBlank()) {

            throw new BadRequestException(
                    "Phone number is required."
            );

        }

        if (!phoneNumber.matches(PHONE_REGEX)) {

            throw new BadRequestException(
                    "Invalid phone number."
            );

        }

    }

}