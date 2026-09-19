package com.example.shopping_ecommerce.util;

import com.example.shopping_ecommerce.dto.response.PagedResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public final class PaginationUtil {

    private PaginationUtil() {
    }

    /**
     * Convert Spring Page into PagedResponse.
     */
    public static <T> PagedResponse<T> buildPagedResponse(
            Page<?> page,
            List<T> content
    ) {

        return PagedResponse.<T>builder()

                .content(content)

                .page(page.getNumber())

                .size(page.getSize())

                .totalElements(page.getTotalElements())

                .totalPages(page.getTotalPages())

                .last(page.isLast())

                .build();

    }

}