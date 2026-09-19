package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.request.CheckoutRequest;
import com.example.shopping_ecommerce.dto.response.OrderResponse;

public interface CheckoutService {

    OrderResponse checkout(CheckoutRequest request);

}