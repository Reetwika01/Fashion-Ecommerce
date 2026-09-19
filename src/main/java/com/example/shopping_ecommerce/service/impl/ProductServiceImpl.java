package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;
import com.example.shopping_ecommerce.entity.Product;
import com.example.shopping_ecommerce.exception.ResourceNotFoundException;
import com.example.shopping_ecommerce.repository.ProductRepository;
import com.example.shopping_ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public PagedResponse<ProductResponse> getAllProducts(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage = productRepository.findAll(pageable);

        return convertToPagedResponse(productPage);

    }

    @Override
    public ProductResponse getProductById(Long productId) {

        Product product = productRepository.findById(productId)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id : " + productId
                        ));

        return mapToProductResponse(product);

    }

    /**
     * Convert Product Entity to ProductResponse DTO
     */
    private ProductResponse mapToProductResponse(Product product) {

        return ProductResponse.builder()

                .id(product.getId())

                .productName(product.getProductName())

                .description(product.getDescription())

                .price(product.getPrice())

                .rating(product.getRating())

                .stock(product.getStock())

                .imageUrl(product.getImageUrl())

                .category(product.getCategory().getName())

                .build();

    }


        @Override
    public PagedResponse<ProductResponse> searchProducts(
            String keyword,
            int page,
            int size
    ) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage =
                productRepository.findByProductNameContainingIgnoreCase(
                        keyword,
                        pageable
                );

        return convertToPagedResponse(productPage);

    }

    /**
     * Convert Page<Product> to PagedResponse<ProductResponse>
     */
    private PagedResponse<ProductResponse> convertToPagedResponse(
            Page<Product> productPage
    ) {

        return PagedResponse.<ProductResponse>builder()

                .content(
                        productPage
                                .getContent()
                                .stream()
                                .map(this::mapToProductResponse)
                                .toList()
                )

                .page(productPage.getNumber())

                .size(productPage.getSize())

                .totalElements(productPage.getTotalElements())

                .totalPages(productPage.getTotalPages())

                .last(productPage.isLast())

                .build();

    }
    

}