package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.request.AddToCartRequest;
import com.example.shopping_ecommerce.dto.request.UpdateCartRequest;
import com.example.shopping_ecommerce.dto.response.ApiResponse;
import com.example.shopping_ecommerce.dto.response.CartResponse;

public interface CartService {

    CartResponse addToCart(AddToCartRequest request);

    CartResponse getCart();

    CartResponse updateCartItem(Long cartItemId, UpdateCartRequest request);

    ApiResponse removeCartItem(Long cartItemId);

    ApiResponse clearCart();

}