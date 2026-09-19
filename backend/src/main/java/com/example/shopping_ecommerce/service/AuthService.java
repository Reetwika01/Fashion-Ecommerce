package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.dto.request.LoginRequest;
import com.example.shopping_ecommerce.dto.request.RefreshTokenRequest;
import com.example.shopping_ecommerce.dto.request.RegisterRequest;
import com.example.shopping_ecommerce.dto.response.ApiResponse;
import com.example.shopping_ecommerce.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(RefreshTokenRequest request);

    ApiResponse logout(RefreshTokenRequest request);

}