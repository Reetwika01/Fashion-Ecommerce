package com.example.shopping_ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import com.example.shopping_ecommerce.enums.CouponType;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "coupons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String couponCode;

    @Column(nullable = false)
    private Integer discountPercentage;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal minimumAmount;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}