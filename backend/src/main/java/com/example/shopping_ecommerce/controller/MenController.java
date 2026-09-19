package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;
import com.example.shopping_ecommerce.service.MenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/men")
@RequiredArgsConstructor
@Tag(name = "Men Products", description = "Men's Products APIs")
public class MenController {

    private final MenService menService;

    @GetMapping
    @Operation(summary = "Get All Men's Products")
    public ResponseEntity<PagedResponse<ProductResponse>> getAllMenProducts(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(
                menService.getAllMenProducts(page, size)
        );

    }

    @GetMapping("/{productId}")
    @Operation(summary = "Get Men's Product By Id")
    public ResponseEntity<ProductResponse> getMenProductById(

            @PathVariable
            Long productId

    ) {

        return ResponseEntity.ok(
                menService.getMenProductById(productId)
        );

    }

    @GetMapping("/search")
    @Operation(summary = "Search Men's Products")
    public ResponseEntity<PagedResponse<ProductResponse>> searchMenProducts(

            @RequestParam
            String keyword,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(
                menService.searchMenProducts(
                        keyword,
                        page,
                        size
                )
        );

    }

}