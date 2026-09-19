package com.example.shopping_ecommerce.util;

import com.example.shopping_ecommerce.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtil {

    private SecurityUtil() {
    }

    /**
     * Returns the current Authentication object.
     */
    public static Authentication getAuthentication() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {

            throw new UnauthorizedException(
                    "User is not authenticated."
            );

        }

        return authentication;

    }

    /**
     * Returns logged-in user's email.
     */
    public static String getLoggedInUsername() {

        return getAuthentication().getName();

    }

    /**
     * Checks whether a user is authenticated.
     */
    public static boolean isAuthenticated() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return authentication != null
                && authentication.isAuthenticated();

    }

}