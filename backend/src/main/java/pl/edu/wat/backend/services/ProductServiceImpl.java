package pl.edu.wat.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import pl.edu.wat.backend.dtos.OrderRequest;
import pl.edu.wat.backend.dtos.ProductRequest;
import pl.edu.wat.backend.dtos.ProductResponse;
import pl.edu.wat.backend.entities.OrderEntity;
import pl.edu.wat.backend.entities.ProductEntity;
import pl.edu.wat.backend.repositories.ProductRepository;

import java.awt.*;
import java.util.*;
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
    public List<ProductResponse> getAllProductsByOrderId(int id) {
        List<ProductResponse> products = StreamSupport.stream(productRepository.findAll().spliterator(), false)
                .map(entity -> new ProductResponse(entity.getId(), entity.getName(), entity.getDescription(), entity.getPrice(), entity.getOrder().getId()))
                .collect(Collectors.toList());

        List<ProductResponse> orderProducts = new ArrayList<>();
        for(ProductResponse product: products){
            if(product.getOrderId() == id){
                orderProducts.add(product);
            }
        }

        return orderProducts;
    }

    @Override
    public void saveProduct(ProductRequest productRequest) {
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

    public void deleteProductById(int id) {
        productRepository.deleteById(id);
    }

    public Optional<ProductResponse> getProductById(int id){
        return productRepository.findById(id).map(entity -> new ProductResponse(entity.getId(), entity.getName(), entity.getDescription(), entity.getPrice(), entity.getOrder().getId()));
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB(){
        saveProduct(new ProductRequest(1, "Football ball", "The I-Pro Galaxy match football", 120, 1));
        saveProduct(new ProductRequest(2, "Shoes", "Wave Rider 25 Men Running-Shoe", 130, 1));
        saveProduct(new ProductRequest(3, "Shoes", "Sprint 2.5 Carpet Women Tennis Shoes", 60, 2));
        saveProduct(new ProductRequest(4, "Racket", "Radical S Tennis Racket (unstrung)", 128, 2));
        saveProduct(new ProductRequest(5, "Tennis balls", "Fort Tournament - 4er Dose Tennis Balls", 13, 2));
    }
}