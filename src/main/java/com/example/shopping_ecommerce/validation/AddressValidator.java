package com.example.shopping_ecommerce.validation;

import com.example.shopping_ecommerce.exception.BadRequestException;
import org.springframework.stereotype.Component;

@Component
public class AddressValidator {

    public void validate(String address) {

        if (address == null || address.isBlank()) {
            throw new BadRequestException(
                    "Shipping address is required."
            );
        }

        if (address.length() < 10) {
            throw new BadRequestException(
                    "Shipping address must be at least 10 characters."
            );
        }

        if (address.length() > 500) {
            throw new BadRequestException(
                    "Shipping address cannot exceed 500 characters."
            );
        }

    }

}