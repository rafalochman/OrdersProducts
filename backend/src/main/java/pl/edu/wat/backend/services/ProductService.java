package pl.edu.wat.backend.services;

import pl.edu.wat.backend.dtos.ProductRequest;
import pl.edu.wat.backend.dtos.ProductResponse;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<ProductResponse> getAllProducts();

    List<ProductResponse> getAllProductsByOrderId(int id);

    void saveProduct(ProductRequest productRequest);

    void deleteProductById(int id);

    Optional<ProductResponse> getProductById(int id);

    void fillDB();
}
