package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;

public interface AccessoriesService {

    PagedResponse<ProductResponse> getAllAccessoriesProducts(int page, int size);

    ProductResponse getAccessoriesProductById(Long productId);

    PagedResponse<ProductResponse> searchAccessoriesProducts(
            String keyword,
            int page,
            int size
    );

}