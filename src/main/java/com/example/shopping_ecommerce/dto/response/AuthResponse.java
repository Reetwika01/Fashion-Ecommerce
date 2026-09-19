package com.example.shopping_ecommerce.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private Long userId;

    private String fullName;

    private String email;

    private String accessToken;

    private String refreshToken;

    private String tokenType;

}