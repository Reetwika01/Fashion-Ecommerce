package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;

public interface WomenService {

    PagedResponse<ProductResponse> getAllWomenProducts(int page, int size);

    ProductResponse getWomenProductById(Long productId);

    PagedResponse<ProductResponse> searchWomenProducts(
            String keyword,
            int page,
            int size
    );

}