package com.example.shopping_ecommerce.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String productName;

    private String description;

    private BigDecimal price;

    private Double rating;

    private Integer stock;

    private String imageUrl;

    private String category;

}