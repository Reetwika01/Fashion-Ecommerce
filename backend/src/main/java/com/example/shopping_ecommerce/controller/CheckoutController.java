package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.request.CheckoutRequest;
import com.example.shopping_ecommerce.dto.response.OrderResponse;
import com.example.shopping_ecommerce.service.CheckoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
@Tag(name = "Checkout", description = "Checkout APIs")
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping
    @Operation(summary = "Place Order")
    public ResponseEntity<OrderResponse> checkout(

            @Valid
            @RequestBody
            CheckoutRequest request

    ) {

        return ResponseEntity.ok(

                checkoutService.checkout(request)

        );

    }

}