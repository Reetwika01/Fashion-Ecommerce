package com.example.shopping_ecommerce.controller;

import com.example.shopping_ecommerce.dto.request.LoginRequest;
import com.example.shopping_ecommerce.dto.request.RefreshTokenRequest;
import com.example.shopping_ecommerce.dto.request.RegisterRequest;
import com.example.shopping_ecommerce.dto.response.ApiResponse;
import com.example.shopping_ecommerce.dto.response.AuthResponse;
import com.example.shopping_ecommerce.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication APIs")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(summary = "User Login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh Access Token")
    public ResponseEntity<AuthResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request) {

        return ResponseEntity.ok(
                authService.refreshToken(request)
        );
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout User")
    public ResponseEntity<ApiResponse> logout(
            @Valid @RequestBody RefreshTokenRequest request) {

        return ResponseEntity.ok(
                authService.logout(request)
        );
    }

}