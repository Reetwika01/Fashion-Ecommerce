package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;

public interface ProductService {

    PagedResponse<ProductResponse> getAllProducts(int page, int size);

    ProductResponse getProductById(Long productId);


    PagedResponse<ProductResponse> searchProducts(
            String keyword,
            int page,
            int size
    );

}