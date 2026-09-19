package com.example.shopping_ecommerce.service.impl;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import com.example.shopping_ecommerce.dto.response.ProductResponse;
import com.example.shopping_ecommerce.entity.Category;
import com.example.shopping_ecommerce.entity.Product;
import com.example.shopping_ecommerce.exception.ResourceNotFoundException;
import com.example.shopping_ecommerce.repository.CategoryRepository;
import com.example.shopping_ecommerce.repository.ProductRepository;
import com.example.shopping_ecommerce.service.MenService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MenServiceImpl implements MenService {

    private static final String MEN_CATEGORY = "Men's Wear";

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public PagedResponse<ProductResponse> getAllMenProducts(int page, int size) {

        Category category = categoryRepository.findByName(MEN_CATEGORY)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found: " + MEN_CATEGORY));

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending()
        );

        Page<Product> productPage =
                productRepository.findByCategory(category, pageable);

        return convertToPagedResponse(productPage);
    }

    @Override
    public ProductResponse getMenProductById(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id : " + productId));

        if (!MEN_CATEGORY.equals(product.getCategory().getName())) {
            throw new ResourceNotFoundException(
                    "Product does not belong to Men's Wear category.");
        }

        return mapToResponse(product);
    }

    @Override
    public PagedResponse<ProductResponse> searchMenProducts(
            String keyword,
            int page,
            int size) {

        Category category = categoryRepository.findByName(MEN_CATEGORY)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found: " + MEN_CATEGORY));

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending()
        );

        Page<Product> productPage =
                productRepository.findByCategoryAndProductNameContainingIgnoreCase(
                        category,
                        keyword,
                        pageable);

        return convertToPagedResponse(productPage);
    }

    /**
     * Product -> ProductResponse
     */
    private ProductResponse mapToResponse(Product product) {

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

    /**
     * Page<Product> -> PagedResponse<ProductResponse>
     */
    private PagedResponse<ProductResponse> convertToPagedResponse(
            Page<Product> productPage) {

        return PagedResponse.<ProductResponse>builder()
                .content(
                        productPage.getContent()
                                .stream()
                                .map(this::mapToResponse)
                                .toList())
                .page(productPage.getNumber())
                .size(productPage.getSize())
                .totalElements(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .last(productPage.isLast())
                .build();
    }
}