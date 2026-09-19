package com.example.shopping_ecommerce.util;

import jakarta.servlet.http.HttpServletRequest;

public final class JwtUtil {

    private JwtUtil() {
    }

    /**
     * Extract JWT token from Authorization header.
     *
     * Header Format:
     * Authorization: Bearer eyJhbGciOi...
     */
    public static String extractToken(HttpServletRequest request) {

        String authorizationHeader =
                request.getHeader(Constants.HEADER_STRING);

        if (authorizationHeader == null
                || authorizationHeader.isBlank()) {

            return null;

        }

        if (!authorizationHeader.startsWith(Constants.TOKEN_PREFIX)) {

            return null;

        }

        return authorizationHeader.substring(
                Constants.TOKEN_PREFIX.length()
        );

    }

    /**
     * Checks whether Authorization header contains Bearer token.
     */
    public static boolean hasBearerToken(HttpServletRequest request) {

        String authorizationHeader =
                request.getHeader(Constants.HEADER_STRING);

        return authorizationHeader != null
                && authorizationHeader.startsWith(
                        Constants.TOKEN_PREFIX
                );

    }

    /**
     * Validate Authorization header.
     */
    public static boolean isValidAuthorizationHeader(String header) {

        return header != null
                && !header.isBlank()
                && header.startsWith(Constants.TOKEN_PREFIX);

    }

    /**
     * Remove Bearer prefix.
     */
    public static String removeBearerPrefix(String token) {

        if (token == null || token.isBlank()) {
            return null;
        }

        if (token.startsWith(Constants.TOKEN_PREFIX)) {

            return token.substring(
                    Constants.TOKEN_PREFIX.length()
            );

        }

        return token;

    }

}