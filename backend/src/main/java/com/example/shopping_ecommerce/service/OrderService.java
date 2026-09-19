package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.response.OrderResponse;
import com.example.shopping_ecommerce.dto.response.PagedResponse;

public interface OrderService {

    PagedResponse<OrderResponse> getAllOrders(int page, int size);

    OrderResponse getOrderById(Long orderId);

}