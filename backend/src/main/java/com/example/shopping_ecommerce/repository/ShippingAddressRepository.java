package com.example.shopping_ecommerce.repository;

import com.example.shopping_ecommerce.entity.ShippingAddress;
import com.example.shopping_ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Long> {

    List<ShippingAddress> findByUser(User user);

}