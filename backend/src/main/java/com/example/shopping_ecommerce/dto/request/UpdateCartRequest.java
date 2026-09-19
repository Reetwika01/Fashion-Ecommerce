package com.example.shopping_ecommerce.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCartRequest {

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity should be at least 1")
    private Integer quantity;

}