package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.dto.request.AddToCartRequest;
import com.example.shopping_ecommerce.dto.request.UpdateCartRequest;
import com.example.shopping_ecommerce.dto.response.ApiResponse;
import com.example.shopping_ecommerce.dto.response.CartItemResponse;
import com.example.shopping_ecommerce.dto.response.CartResponse;
import com.example.shopping_ecommerce.entity.Cart;
import com.example.shopping_ecommerce.entity.CartItem;
import com.example.shopping_ecommerce.entity.Product;
import com.example.shopping_ecommerce.entity.User;
import com.example.shopping_ecommerce.exception.CartException;
import com.example.shopping_ecommerce.exception.ResourceNotFoundException;
import com.example.shopping_ecommerce.exception.UnauthorizedException;
import com.example.shopping_ecommerce.repository.CartItemRepository;
import com.example.shopping_ecommerce.repository.CartRepository;
import com.example.shopping_ecommerce.repository.ProductRepository;
import com.example.shopping_ecommerce.repository.UserRepository;
import com.example.shopping_ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public CartResponse addToCart(AddToCartRequest request) {

        User user = getLoggedInUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new CartException("Cart not found."));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id : " + request.getProductId()));

        if (request.getQuantity() > product.getStock()) {
            throw new CartException(
                    "Only " + product.getStock() + " items available in stock."
            );
        }

        CartItem cartItem = cartItemRepository
                .findByCartAndProduct(cart, product)
                .orElse(null);

        if (cartItem == null) {

            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .price(product.getPrice())
                    .totalPrice(
                            product.getPrice().multiply(
                                    BigDecimal.valueOf(request.getQuantity())
                            )
                    )
                    .build();

        } else {

            int updatedQuantity =
                    cartItem.getQuantity() + request.getQuantity();

            if (updatedQuantity > product.getStock()) {
                throw new CartException(
                        "Only " + product.getStock() + " items available in stock."
                );
            }

            cartItem.setQuantity(updatedQuantity);

            cartItem.setPrice(product.getPrice());

            cartItem.setTotalPrice(
                    product.getPrice().multiply(
                            BigDecimal.valueOf(updatedQuantity)
                    )
            );
        }

        cartItem = cartItemRepository.save(cartItem);

        calculateCartTotal(cart);

        return buildCartResponse(cart);
    }

    @Override
    public CartResponse getCart() {

        User user = getLoggedInUser();

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new CartException("Cart not found."));

        calculateCartTotal(cart);

        return buildCartResponse(cart);
    }

    /**
     * Returns currently logged-in user.
     */
    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {

            throw new UnauthorizedException(
                    "User is not authenticated."
            );
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UnauthorizedException(
                                "User not found."
                        ));
    }

    /**
     * Recalculate cart total.
     */
    private void calculateCartTotal(Cart cart) {

        List<CartItem> cartItems =
                cartItemRepository.findByCart(cart);

        BigDecimal total = cartItems.stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        cart.setTotalAmount(total);

        cartRepository.save(cart);
    }


    @Override
    public CartResponse updateCartItem(Long cartItemId,
                                   UpdateCartRequest request) {

    CartItem cartItem = cartItemRepository.findById(cartItemId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Cart Item not found."
                    ));

    Product product = cartItem.getProduct();

    if (request.getQuantity() > product.getStock()) {

        throw new CartException(
                "Requested quantity exceeds available stock."
        );

    }

    cartItem.setQuantity(request.getQuantity());

    cartItem.setTotalPrice(

            product.getPrice()

                    .multiply(
                            BigDecimal.valueOf(
                                    request.getQuantity()
                            )
                    )

    );

    cartItemRepository.save(cartItem);

    calculateCartTotal(cartItem.getCart());

    return buildCartResponse(cartItem.getCart());

}

@Override
public ApiResponse removeCartItem(Long cartItemId) {

    CartItem cartItem = cartItemRepository.findById(cartItemId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Cart Item not found."
                    ));

    Cart cart = cartItem.getCart();

    cartItemRepository.delete(cartItem);

    calculateCartTotal(cart);

    return ApiResponse.builder()
            .success(true)
            .message("Item removed from cart successfully.")
            .build();

}

@Override
public ApiResponse clearCart() {

    User user = getLoggedInUser();

    Cart cart = cartRepository.findByUser(user)
            .orElseThrow(() ->
                    new CartException("Cart not found."));

    List<CartItem> cartItems =
            cartItemRepository.findByCart(cart);

    cartItemRepository.deleteAll(cartItems);

    cart.setTotalAmount(BigDecimal.ZERO);

    cartRepository.save(cart);

    return ApiResponse.builder()
            .success(true)
            .message("Cart cleared successfully.")
            .build();

}

/**
 * Build Cart Response
 */
private CartResponse buildCartResponse(Cart cart) {

    List<CartItemResponse> items = cartItemRepository.findByCart(cart)

            .stream()

            .map(item ->

                    CartItemResponse.builder()

                            .cartItemId(item.getId())

                            .productId(item.getProduct().getId())

                            .productName(item.getProduct().getProductName())

                            .quantity(item.getQuantity())

                            .price(item.getPrice())

                            .totalPrice(item.getTotalPrice())

                            .productImage(item.getProduct().getImageUrl())

                            .build()

            )

            .toList();

    return CartResponse.builder()

            .cartId(cart.getId())

            .items(items)

            .totalAmount(cart.getTotalAmount())

            .build();

        }

}