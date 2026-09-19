package com.example.shopping_ecommerce.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {

    private Long cartItemId;

    private Long productId;

    private String productName;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal totalPrice;

    private String productImage;

}