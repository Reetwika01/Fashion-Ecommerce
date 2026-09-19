package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.request.AddToCartRequest;
import com.example.shopping_ecommerce.dto.request.UpdateCartRequest;
import com.example.shopping_ecommerce.dto.response.ApiResponse;
import com.example.shopping_ecommerce.dto.response.CartResponse;
import com.example.shopping_ecommerce.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Shopping Cart APIs")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    @Operation(summary = "Add Product To Cart")
    public ResponseEntity<CartResponse> addToCart(

            @Valid @RequestBody
            AddToCartRequest request

    ) {

        return ResponseEntity.ok(
                cartService.addToCart(request)
        );

    }

    @GetMapping
    @Operation(summary = "Get User Cart")
    public ResponseEntity<CartResponse> getCart() {

        return ResponseEntity.ok(
                cartService.getCart()
        );

    }

    @PutMapping("/{cartItemId}")
    @Operation(summary = "Update Cart Item")
    public ResponseEntity<CartResponse> updateCartItem(

            @PathVariable Long cartItemId,

            @Valid @RequestBody
            UpdateCartRequest request

    ) {

        return ResponseEntity.ok(
                cartService.updateCartItem(
                        cartItemId,
                        request
                )
        );

    }

    @DeleteMapping("/{cartItemId}")
    @Operation(summary = "Remove Cart Item")
    public ResponseEntity<ApiResponse> removeCartItem(

            @PathVariable Long cartItemId

    ) {

        return ResponseEntity.ok(
                cartService.removeCartItem(cartItemId)
        );

    }

    @DeleteMapping("/clear")
    @Operation(summary = "Clear Cart")
    public ResponseEntity<ApiResponse> clearCart() {

        return ResponseEntity.ok(
                cartService.clearCart()
        );

    }

}