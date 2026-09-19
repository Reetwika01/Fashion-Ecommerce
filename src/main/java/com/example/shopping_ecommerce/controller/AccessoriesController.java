package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;
import com.example.shopping_ecommerce.service.AccessoriesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accessories")
@RequiredArgsConstructor
@Tag(name = "Accessories", description = "Accessories APIs")
public class AccessoriesController {

    private final AccessoriesService accessoriesService;

    @GetMapping
    @Operation(summary = "Get All Accessories")
    public ResponseEntity<PagedResponse<ProductResponse>> getAllAccessoriesProducts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(
                accessoriesService.getAllAccessoriesProducts(page, size)
        );

    }

    @GetMapping("/{productId}")
    @Operation(summary = "Get Accessories Product By Id")
    public ResponseEntity<ProductResponse> getAccessoriesProductById(

            @PathVariable
            Long productId

    ) {

        return ResponseEntity.ok(
                accessoriesService.getAccessoriesProductById(productId)
        );

    }

    @GetMapping("/search")
    @Operation(summary = "Search Accessories")
    public ResponseEntity<PagedResponse<ProductResponse>> searchAccessoriesProducts(

            @RequestParam
            String keyword,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(
                accessoriesService.searchAccessoriesProducts(
                        keyword,
                        page,
                        size
                )
        );

    }

}