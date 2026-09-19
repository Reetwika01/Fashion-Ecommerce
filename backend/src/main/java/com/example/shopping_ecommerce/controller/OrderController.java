package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.response.OrderResponse;
import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order APIs")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    @Operation(summary = "Get My Orders")
    public ResponseEntity<PagedResponse<OrderResponse>> getAllOrders(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return ResponseEntity.ok(
                orderService.getAllOrders(page, size)
        );

    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Get Order By Id")
    public ResponseEntity<OrderResponse> getOrderById(

            @PathVariable
            Long orderId

    ) {

        return ResponseEntity.ok(
                orderService.getOrderById(orderId)
        );

    }

}