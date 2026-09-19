INSERT INTO coupons
(
    coupon_code,
    discount_percentage,
    minimum_amount,
    active,
    created_at
)

VALUES

(
    'SUPER5',
    5,
    3000.00,
    TRUE,
    NOW()
),

(
    'SUPER10',
    10,
    5000.00,
    TRUE,
    NOW()
),

(
    'SUPER15',
    15,
    10000.00,
    TRUE,
    NOW()
);