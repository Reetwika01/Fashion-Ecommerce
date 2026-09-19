package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.dto.response.CartItemResponse;
import com.example.shopping_ecommerce.dto.response.OrderResponse;
import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.entity.Order;
import com.example.shopping_ecommerce.entity.OrderItem;
import com.example.shopping_ecommerce.entity.Payment;
import com.example.shopping_ecommerce.entity.User;
import com.example.shopping_ecommerce.exception.ResourceNotFoundException;
import com.example.shopping_ecommerce.exception.UnauthorizedException;
import com.example.shopping_ecommerce.repository.OrderRepository;
import com.example.shopping_ecommerce.repository.PaymentRepository;
import com.example.shopping_ecommerce.repository.UserRepository;
import com.example.shopping_ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    @Override
    public PagedResponse<OrderResponse> getAllOrders(int page, int size) {

        User user = getLoggedInUser();

        Pageable pageable = PageRequest.of(page, size);

        Page<Order> orders =
                orderRepository.findByUser(user, pageable);

        List<OrderResponse> responses = orders.getContent()

                .stream()

                .map(this::mapToResponse)

                .toList();

        return PagedResponse.<OrderResponse>builder()

                .content(responses)

                .page(orders.getNumber())

                .size(orders.getSize())

                .totalElements(orders.getTotalElements())

                .totalPages(orders.getTotalPages())

                .last(orders.isLast())

                .build();

    }

    @Override
    public OrderResponse getOrderById(Long orderId) {

        User user = getLoggedInUser();

        Order order = orderRepository.findById(orderId)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found."
                        ));

        if (!order.getUser().getId().equals(user.getId())) {

            throw new UnauthorizedException(
                    "You are not authorized to view this order."
            );

        }

        return mapToResponse(order);

    }

    /**
     * Logged-in User
     */
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new UnauthorizedException(
                    "User not authenticated."
            );

        }

        return userRepository.findByEmail(authentication.getName())

                .orElseThrow(() ->
                        new UnauthorizedException(
                                "User not found."
                        ));

    }

    /**
     * Entity -> DTO
     */
    private OrderResponse mapToResponse(Order order) {

        Payment payment = paymentRepository
                .findByOrder(order)
                .orElse(null);

        List<CartItemResponse> products =

                order.getOrderItems()

                        .stream()

                        .map(this::mapCartItem)

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
                        payment != null
                                ? payment.getPaymentStatus().name()
                                : "N/A"
                )

                .orderDate(order.getOrderDate())

                .build();

    }

    /**
     * OrderItem -> CartItemResponse
     */
    private CartItemResponse mapCartItem(OrderItem item) {

        return CartItemResponse.builder()

                .cartItemId(item.getId())

                .productId(item.getProduct().getId())

                .productName(item.getProduct().getProductName())

                .quantity(item.getQuantity())

                .price(item.getPrice())

                .totalPrice(item.getTotalPrice())

                .build();

    }

}