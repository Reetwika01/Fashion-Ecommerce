package com.example.shopping_ecommerce.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.shopping_ecommerce.dto.request.CheckoutRequest;
import com.example.shopping_ecommerce.dto.request.PaymentRequest;
import com.example.shopping_ecommerce.dto.response.CartItemResponse;
import com.example.shopping_ecommerce.dto.response.OrderResponse;
import com.example.shopping_ecommerce.dto.response.PaymentResponse;
import com.example.shopping_ecommerce.entity.Cart;
import com.example.shopping_ecommerce.entity.CartItem;
import com.example.shopping_ecommerce.entity.Coupon;
import com.example.shopping_ecommerce.entity.Order;
import com.example.shopping_ecommerce.entity.OrderItem;
import com.example.shopping_ecommerce.entity.Product;
import com.example.shopping_ecommerce.entity.ShippingAddress;
import com.example.shopping_ecommerce.entity.User;
import com.example.shopping_ecommerce.exception.BadRequestException;
import com.example.shopping_ecommerce.exception.CartException;
import com.example.shopping_ecommerce.exception.ResourceNotFoundException;
import com.example.shopping_ecommerce.exception.UnauthorizedException;
import com.example.shopping_ecommerce.repository.CartItemRepository;
import com.example.shopping_ecommerce.repository.CartRepository;
import com.example.shopping_ecommerce.repository.CouponRepository;
import com.example.shopping_ecommerce.repository.OrderItemRepository;
import com.example.shopping_ecommerce.repository.OrderRepository;
import com.example.shopping_ecommerce.repository.ProductRepository;
import com.example.shopping_ecommerce.repository.ShippingAddressRepository;
import com.example.shopping_ecommerce.repository.UserRepository;
import com.example.shopping_ecommerce.service.CheckoutService;
import com.example.shopping_ecommerce.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CheckoutServiceImpl implements CheckoutService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final CouponRepository couponRepository;
    private final ShippingAddressRepository shippingAddressRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentService paymentService;

    /**
     * Returns currently logged-in user.
     */
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User is not authenticated.");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UnauthorizedException("User not found."));
    }

    /**
     * Returns logged-in user's cart.
     */
    private Cart getUserCart(User user) {

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new CartException("Cart not found."));

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            throw new CartException("Your cart is empty.");
        }

        return cart;
    }

    /**
     * Calculates subtotal.
     */
    private BigDecimal calculateSubTotal(List<CartItem> cartItems) {

        BigDecimal subTotal = BigDecimal.ZERO;

        for (CartItem item : cartItems) {

            subTotal = subTotal.add(item.getTotalPrice());

        }

        return subTotal;
    }

    /**
     * Validate product stock before checkout.
     */
    private void validateStock(List<CartItem> cartItems) {

        for (CartItem item : cartItems) {

            Product product = productRepository.findById(
                    item.getProduct().getId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Product not found."));

            if (item.getQuantity() > product.getStock()) {

                throw new CartException(

                        product.getProductName()
                                + " has only "
                                + product.getStock()
                                + " item(s) available."

                );

            }

        }

    }

        /**
     * Calculate discount using coupon.
     */
    private BigDecimal calculateDiscount(
            BigDecimal subTotal,
            String couponCode
    ) {

        if (couponCode == null || couponCode.isBlank()) {
            return BigDecimal.ZERO;
        }

        Coupon coupon = couponRepository.findByCouponCode(couponCode)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invalid coupon code."
                        ));

        if (!coupon.getActive()) {
            throw new BadRequestException(
                    "Coupon is inactive."
            );
        }

        if (subTotal.compareTo(coupon.getMinimumAmount()) < 0) {

            throw new BadRequestException(

                    "Coupon "
                            + coupon.getCouponCode()
                            + " requires minimum purchase of ₹"
                            + coupon.getMinimumAmount()

            );

        }

        return subTotal
                .multiply(
                        BigDecimal.valueOf(
                                coupon.getDiscountPercentage()
                        )
                )
                .divide(BigDecimal.valueOf(100));

    }


        @Override
        public OrderResponse checkout(CheckoutRequest request) {

        User user = getLoggedInUser();

        Cart cart = getUserCart(user);

        List<CartItem> cartItems = cartItemRepository.findByCart(cart);
        System.out.println("===== CART ITEMS =====");

for (CartItem item : cartItems) {
    System.out.println(
            item.getProduct().getProductName()
            + " Qty=" + item.getQuantity()
            + " Total=" + item.getTotalPrice()
    );
}

        validateStock(cartItems);


        BigDecimal subTotal = calculateSubTotal(cartItems);
        System.out.println("===== CHECKOUT DEBUG =====");

for (CartItem item : cartItems) {
    System.out.println(
            item.getProduct().getProductName()
            + " Qty=" + item.getQuantity()
            + " Price=" + item.getPrice()
            + " Total=" + item.getTotalPrice()
    );
}

System.out.println("Subtotal = " + subTotal);
System.out.println("Coupon = " + request.getCouponCode());

        BigDecimal discount =
                calculateDiscount(
                        subTotal,
                        request.getCouponCode()
                );

        BigDecimal finalAmount =
                subTotal.subtract(discount);

        ShippingAddress shippingAddress =
                createShippingAddress(
                        user,
                        request
                );

        Coupon coupon = null;

        if (request.getCouponCode() != null &&
                !request.getCouponCode().isBlank()) {

            coupon = couponRepository
                    .findByCouponCode(request.getCouponCode())
                    .orElse(null);

        }

        Order order = createOrder(
                user,
                shippingAddress,
                coupon,
                subTotal,
                discount,
                finalAmount
        );

        createOrderItems(
                order,
                cartItems
        );

        updateProductStock(
                cartItems
        );

        PaymentRequest paymentRequest =
                PaymentRequest.builder()

                        .orderId(order.getId())

                        .paymentMethod(request.getPaymentMethod())

                        .build();


        PaymentResponse paymentResponse =
                paymentService.makePayment(paymentRequest);

        clearCart(cart);

        return buildOrderResponse(
                order,
                paymentResponse
        );

    }

    /**
     * Save Shipping Address
     */
    private ShippingAddress createShippingAddress(
            User user,
            CheckoutRequest request
    ) {

        ShippingAddress shippingAddress =
                ShippingAddress.builder()

                        .customerName(request.getCustomerName())

                        .phoneNumber(request.getPhoneNumber())

                        .address(request.getAddress())

                        .user(user)

                        .build();

        return shippingAddressRepository.save(shippingAddress);

    }

    /**
     * Create Order
     */
    private Order createOrder(
            User user,
            ShippingAddress shippingAddress,
            Coupon coupon,
            BigDecimal subTotal,
            BigDecimal discount,
            BigDecimal finalAmount
    ) {

        String orderNumber = "ORD-" + System.currentTimeMillis();

        Order order = Order.builder()
        .orderNumber(orderNumber)
        .user(user)
        .shippingAddress(shippingAddress)
        .coupon(coupon)
        .subTotal(subTotal)
        .discountAmount(discount)
        .finalAmount(finalAmount)
        .orderStatus("PLACED")
        .paymentStatus("PENDING")
        .build();

        return orderRepository.save(order);

    }

        /**
     * Create Order Items
     */
    private void createOrderItems(
            Order order,
            List<CartItem> cartItems
    ) {

        for (CartItem cartItem : cartItems) {

            OrderItem orderItem = OrderItem.builder()

                    .order(order)

                    .product(cartItem.getProduct())

                    .quantity(cartItem.getQuantity())

                    .price(cartItem.getPrice())

                    .totalPrice(cartItem.getTotalPrice())

                    .build();

            orderItem = orderItemRepository.save(orderItem);

            order.getOrderItems().add(orderItem);

        }

    }

    /**
     * Reduce Product Stock
     */
    private void updateProductStock(
            List<CartItem> cartItems
    ) {

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            product.setStock(
                    product.getStock() - cartItem.getQuantity()
            );

            productRepository.save(product);

        }

    }

    /**
     * Clear Cart
     */
    private void clearCart(Cart cart) {

        cartItemRepository.deleteAll(cart.getCartItems());

        cart.getCartItems().clear();

        cart.setTotalAmount(BigDecimal.ZERO);

        cartRepository.save(cart);

    }

    /**
     * Build Order Response
     */
    private OrderResponse buildOrderResponse(
            Order order,
            PaymentResponse paymentResponse
    ) {

        List<CartItemResponse> products = order.getOrderItems()

                .stream()

                .map(item ->

                        CartItemResponse.builder()

                                .cartItemId(item.getId())

                                .productId(item.getProduct().getId())

                                .productName(item.getProduct().getProductName())

                                .quantity(item.getQuantity())

                                .price(item.getPrice())

                                .totalPrice(item.getTotalPrice())

                                .build()

                )

                .toList();

        return OrderResponse.builder()

                .orderId(order.getId())

                .orderNumber(order.getOrderNumber())

                .customerName(
                        order.getShippingAddress().getCustomerName()
                )

                .phoneNumber(
                        order.getShippingAddress().getPhoneNumber()
                )

                .address(
                        order.getShippingAddress().getAddress()
                )

                .products(products)

                .subTotal(order.getSubTotal())

                .discountAmount(order.getDiscountAmount())

                .finalAmount(order.getFinalAmount())

                .couponCode(
                        order.getCoupon() != null
                                ? order.getCoupon().getCouponCode()
                                : null
                )

                .orderStatus(order.getOrderStatus())

                .paymentStatus(
                        paymentResponse.getPaymentStatus()
                )

                .orderDate(order.getOrderDate())

                .build();

    }

    /**
     * Generate Order Number
     */
    private String generateOrderNumber() {

        return "ORD-"
                + java.util.UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 10)
                .toUpperCase();

    }

}