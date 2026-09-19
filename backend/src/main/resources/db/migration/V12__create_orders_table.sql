CREATE TABLE orders (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    order_number VARCHAR(100) NOT NULL UNIQUE,

    user_id BIGINT NOT NULL,

    shipping_address_id BIGINT NOT NULL,

    coupon_id BIGINT,

    sub_total DECIMAL(10,2) NOT NULL,

    discount_amount DECIMAL(10,2) NOT NULL,

    final_amount DECIMAL(10,2) NOT NULL,

    order_status VARCHAR(30) NOT NULL,

    payment_status VARCHAR(30) NOT NULL,

    order_date DATETIME NOT NULL,

    CONSTRAINT fk_order_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_order_shipping
        FOREIGN KEY (shipping_address_id)
        REFERENCES shipping_addresses(id),

    CONSTRAINT fk_order_coupon
        FOREIGN KEY (coupon_id)
        REFERENCES coupons(id)

);