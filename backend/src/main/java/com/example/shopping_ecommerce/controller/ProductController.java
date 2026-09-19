package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;
import com.example.shopping_ecommerce.service.ProductService;
import com.example.shopping_ecommerce.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product APIs")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Get All Products")
    public PagedResponse<ProductResponse> getAllProducts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return productService.getAllProducts(page, size);

    }

    @GetMapping("/{productId}")
    @Operation(summary = "Get Product By Id")
    public ProductResponse getProductById(

            @PathVariable Long productId

    ) {

        return productService.getProductById(productId);

    }

    @GetMapping("/search")
    @Operation(summary = "Search Products")
    public PagedResponse<ProductResponse> searchProducts(

            @RequestParam String keyword,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return productService.searchProducts(
                keyword,
                page,
                size
        );

    }

}