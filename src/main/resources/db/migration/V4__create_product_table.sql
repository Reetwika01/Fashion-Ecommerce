CREATE TABLE products (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    product_name VARCHAR(150) NOT NULL,

    description VARCHAR(500),

    price DECIMAL(10,2) NOT NULL,

    rating DOUBLE NOT NULL,

    stock INT NOT NULL,

    image_url VARCHAR(500),

    category_id BIGINT NOT NULL,

    created_at DATETIME NOT NULL,

    updated_at DATETIME NOT NULL,

    CONSTRAINT fk_product_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id)

);