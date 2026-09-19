package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.dto.request.LoginRequest;
import com.example.shopping_ecommerce.dto.request.RefreshTokenRequest;
import com.example.shopping_ecommerce.dto.request.RegisterRequest;
import com.example.shopping_ecommerce.dto.response.AuthResponse;
import com.example.shopping_ecommerce.entity.RefreshToken;
import com.example.shopping_ecommerce.entity.User;
import com.example.shopping_ecommerce.exception.BadRequestException;
import com.example.shopping_ecommerce.exception.InvalidCredentialsException;
import com.example.shopping_ecommerce.repository.CartRepository;
import com.example.shopping_ecommerce.repository.UserRepository;
import com.example.shopping_ecommerce.security.JwtService;
import com.example.shopping_ecommerce.security.UserPrincipal;
import com.example.shopping_ecommerce.service.AuthService;
import com.example.shopping_ecommerce.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.math.BigDecimal;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.shopping_ecommerce.dto.response.ApiResponse;
import com.example.shopping_ecommerce.entity.Cart;



@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final CartRepository cartRepository;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists.");
        }

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new BadRequestException("Phone number already exists.");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .enabled(true)
                .build();

        user = userRepository.save(user);
        Cart cart = Cart.builder()
            .user(user)
            .totalAmount(BigDecimal.ZERO)
            .build();

        cartRepository.save(cart);

        UserPrincipal userPrincipal = new UserPrincipal(user);

        String accessToken = jwtService.generateAccessToken(userPrincipal);

        refreshTokenService.revokeAllUserTokens(user);

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);  

        return buildAuthResponse(
                user,
                accessToken,
                refreshToken.getToken()
        );
    }

    @Override
public AuthResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new InvalidCredentialsException(
                            "Email is incorrect."
                    ));

    if (!user.getEmail().equals(request.getEmail())) {

        throw new InvalidCredentialsException(
                "Email is incorrect."
        );

    }

    try {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getEmail(),
                        request.getPassword()

                )

        );

    } catch (Exception ex) {

        throw new InvalidCredentialsException(
                "Password is incorrect."
        );

    }

    UserPrincipal userPrincipal =
            new UserPrincipal(user);

    String accessToken =
            jwtService.generateAccessToken(userPrincipal);

    refreshTokenService.revokeAllUserTokens(user);

    RefreshToken refreshToken =
            refreshTokenService.createRefreshToken(user);

    return buildAuthResponse(
            user,
            accessToken,
            refreshToken.getToken()
    );
}

    /**
     * Build Authentication Response
     */
    private AuthResponse buildAuthResponse(
            User user,
            String accessToken,
            String refreshToken
    ) {

        return AuthResponse.builder()

                .userId(user.getId())

                .fullName(user.getFullName())

                .email(user.getEmail())

                .accessToken(accessToken)

                .refreshToken(refreshToken)

                .tokenType("Bearer")

                .build();

    }

        @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {

        RefreshToken refreshToken = refreshTokenService
                .verifyRefreshToken(request.getRefreshToken());

        User user = refreshToken.getUser();

        UserPrincipal userPrincipal = new UserPrincipal(user);

        String newAccessToken =
                jwtService.generateAccessToken(userPrincipal);

        return buildAuthResponse(
                user,
                newAccessToken,
                refreshToken.getToken()
        );
    }

    @Override
    public ApiResponse logout(RefreshTokenRequest request) {

        refreshTokenService.revokeRefreshToken(
                request.getRefreshToken()
        );

        return ApiResponse.builder()
                .success(true)
                .message("Logout successful.")
                .build();
    }


}