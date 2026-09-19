package com.example.shopping_ecommerce.repository;

import com.example.shopping_ecommerce.entity.Order;
import com.example.shopping_ecommerce.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrder(Order order);

    Optional<Payment> findByTransactionId(String transactionId);

}