package pl.edu.wat.backend.services;

import pl.edu.wat.backend.dtos.ProductRequest;
import pl.edu.wat.backend.dtos.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();

    void addProduct(ProductRequest productRequest);
}
