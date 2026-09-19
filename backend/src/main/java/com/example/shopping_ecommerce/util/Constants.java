package com.example.shopping_ecommerce.util;

public final class Constants {

    private Constants() {
        // Prevent instantiation
    }

    /*
     * JWT
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";

    /*
     * Roles
     */
    public static final String USER_ROLE = "USER";

    /*
     * Order Status
     */
    public static final String ORDER_PLACED = "PLACED";

    public static final String ORDER_CONFIRMED = "CONFIRMED";

    public static final String ORDER_SHIPPED = "SHIPPED";

    public static final String ORDER_DELIVERED = "DELIVERED";

    public static final String ORDER_CANCELLED = "CANCELLED";

    /*
     * Coupon Codes
     */
    public static final String SUPER5 = "SUPER5";

    public static final String SUPER10 = "SUPER10";

    public static final String SUPER15 = "SUPER15";

    /*
     * Default Pagination
     */
    public static final int DEFAULT_PAGE = 0;

    public static final int DEFAULT_SIZE = 10;

    /*
     * Messages
     */
    public static final String LOGIN_SUCCESS =
            "Login successful.";

    public static final String REGISTER_SUCCESS =
            "Registration successful.";

    public static final String LOGOUT_SUCCESS =
            "Logout successful.";

    public static final String CART_EMPTY =
            "Your cart is empty.";

    public static final String PRODUCT_NOT_FOUND =
            "Product not found.";

    public static final String ORDER_NOT_FOUND =
            "Order not found.";

}