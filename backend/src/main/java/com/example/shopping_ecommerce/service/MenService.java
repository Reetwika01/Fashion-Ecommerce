package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;

public interface MenService {

    PagedResponse<ProductResponse> getAllMenProducts(int page, int size);

    ProductResponse getMenProductById(Long productId);

    PagedResponse<ProductResponse> searchMenProducts(
            String keyword,
            int page,
            int size
    );

}