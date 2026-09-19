package com.example.shopping_ecommerce.repository;

import com.example.shopping_ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(
            value = "SELECT * FROM users WHERE BINARY email = :email",
            nativeQuery = true
    )
    Optional<User> findByEmail(@Param("email") String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);
}