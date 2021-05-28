package pl.edu.wat.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.wat.backend.dtos.ProductRequest;
import pl.edu.wat.backend.dtos.ProductResponse;
import pl.edu.wat.backend.entities.OrderEntity;
import pl.edu.wat.backend.entities.ProductEntity;
import pl.edu.wat.backend.repositories.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return StreamSupport.stream(productRepository.findAll().spliterator(), false)
                .map(entity -> new ProductResponse(entity.getId(), entity.getName(), entity.getDescription(), entity.getPrice(), entity.getOrder().getId()))
                .collect(Collectors.toList());
    }

    @Override
    public void addProduct(ProductRequest productRequest) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setId(productRequest.getId());
        productEntity.setName(productRequest.getName());
        productEntity.setDescription(productRequest.getDescription());
        productEntity.setPrice(productRequest.getPrice());

        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(productRequest.getOrderId());
        productEntity.setOrder(orderEntity);

        productRepository.save(productEntity);
    }
}
