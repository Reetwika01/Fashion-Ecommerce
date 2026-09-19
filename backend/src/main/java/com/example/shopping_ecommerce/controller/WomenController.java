package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;
import com.example.shopping_ecommerce.service.WomenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/women")
@RequiredArgsConstructor
@Tag(name = "Women Products", description = "Women's Products APIs")
public class WomenController {

    private final WomenService womenService;

    @GetMapping
    @Operation(summary = "Get All Women's Products")
    public ResponseEntity<PagedResponse<ProductResponse>> getAllWomenProducts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(
                womenService.getAllWomenProducts(page, size)
        );

    }

    @GetMapping("/{productId}")
    @Operation(summary = "Get Women's Product By Id")
    public ResponseEntity<ProductResponse> getWomenProductById(

            @PathVariable
            Long productId

    ) {

        return ResponseEntity.ok(
                womenService.getWomenProductById(productId)
        );

    }

    @GetMapping("/search")
    @Operation(summary = "Search Women's Products")
    public ResponseEntity<PagedResponse<ProductResponse>> searchWomenProducts(

            @RequestParam
            String keyword,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(
                womenService.searchWomenProducts(
                        keyword,
                        page,
                        size
                )
        );

    }

}