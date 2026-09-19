CREATE TABLE cart_items (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    cart_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    quantity INT NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    total_price DECIMAL(10,2) NOT NULL,

    created_at DATETIME NOT NULL,

    CONSTRAINT fk_cart_item_cart
        FOREIGN KEY (cart_id)
        REFERENCES cart(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_cart_item_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)

);