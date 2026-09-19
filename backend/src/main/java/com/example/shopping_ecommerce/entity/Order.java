package com.example.shopping_ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_address_id", nullable = false)
    private ShippingAddress shippingAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subTotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal discountAmount;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal finalAmount;

    @Column(nullable = false, length = 30)
    private String orderStatus;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String paymentStatus = "PENDING";

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @OneToOne(mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Payment payment;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<OrderItem> orderItems = new ArrayList<>();

    @PrePersist
    public void onCreate() {
        orderDate = LocalDateTime.now();
    }
}