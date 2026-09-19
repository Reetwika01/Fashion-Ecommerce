package com.example.shopping_ecommerce.dto.request;


import com.example.shopping_ecommerce.enums.PaymentMethod;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutRequest {

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Shipping address is required")
    private String address;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter a valid 10-digit phone number"
    )
    private String phoneNumber;

    private String couponCode;

    private PaymentMethod paymentMethod;

}