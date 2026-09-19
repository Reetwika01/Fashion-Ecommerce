package com.example.shopping_ecommerce.service;

import com.example.shopping_ecommerce.entity.RefreshToken;
import com.example.shopping_ecommerce.entity.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    RefreshToken verifyRefreshToken(String token);

    void revokeRefreshToken(String token);

    void revokeAllUserTokens(User user);

}