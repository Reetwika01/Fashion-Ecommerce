CREATE TABLE coupons (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    coupon_code VARCHAR(30) NOT NULL UNIQUE,

    discount_percentage INT NOT NULL,

    minimum_amount DECIMAL(10,2) NOT NULL,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at DATETIME NOT NULL

);