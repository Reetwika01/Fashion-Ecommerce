package com.example.shopping_ecommerce.repository;

import com.example.shopping_ecommerce.entity.Order;
import com.example.shopping_ecommerce.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);

}