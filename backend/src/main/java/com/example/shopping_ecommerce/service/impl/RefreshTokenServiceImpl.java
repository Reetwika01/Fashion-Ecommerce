package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.entity.RefreshToken;
import com.example.shopping_ecommerce.entity.User;
import com.example.shopping_ecommerce.exception.TokenExpiredException;
import com.example.shopping_ecommerce.exception.UnauthorizedException;
import com.example.shopping_ecommerce.repository.RefreshTokenRepository;
import com.example.shopping_ecommerce.security.JwtService;
import com.example.shopping_ecommerce.security.UserPrincipal;
import com.example.shopping_ecommerce.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    @Value("${jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;

    @Override
    public RefreshToken createRefreshToken(User user) {

        UserPrincipal userPrincipal = new UserPrincipal(user);

        String token = jwtService.generateRefreshToken(userPrincipal);

        RefreshToken refreshToken = RefreshToken.builder()
                .token(token)
                .expiryDate(
                        LocalDateTime.now()
                                .plus(Duration.ofMillis(refreshTokenExpiration))
                )
                .revoked(false)
                .user(user)
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid refresh token."));

        if (Boolean.TRUE.equals(refreshToken.getRevoked())) {
            throw new UnauthorizedException(
                    "Refresh token has been revoked."
            );
        }

        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new TokenExpiredException(
                    "Refresh token has expired."
            );
        }

        return refreshToken;
    }

    @Override
    public void revokeRefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new UnauthorizedException("Refresh token not found."));

        refreshToken.setRevoked(true);

        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public void revokeAllUserTokens(User user) {

        List<RefreshToken> refreshTokens =
                refreshTokenRepository.findByUser(user);

        for (RefreshToken refreshToken : refreshTokens) {

            refreshToken.setRevoked(true);

        }

        refreshTokenRepository.saveAll(refreshTokens);
    }

}