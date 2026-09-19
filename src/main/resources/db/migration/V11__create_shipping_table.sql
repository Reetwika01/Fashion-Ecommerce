CREATE TABLE shipping_addresses (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    customer_name VARCHAR(100) NOT NULL,

    phone_number VARCHAR(15) NOT NULL,

    address VARCHAR(500) NOT NULL,

    user_id BIGINT NOT NULL,

    created_at DATETIME NOT NULL,

    CONSTRAINT fk_shipping_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);