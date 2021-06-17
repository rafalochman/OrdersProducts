package pl.edu.wat.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.wat.backend.dtos.OrderResponse;
import pl.edu.wat.backend.dtos.ProductRequest;
import pl.edu.wat.backend.dtos.ProductResponse;
import pl.edu.wat.backend.services.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/order")
    public ResponseEntity<List<ProductResponse>> getProductsByOrderId(@RequestParam int id) {
        List<ProductResponse> products = productService.getAllProductsByOrderId(id);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity addProduct(@RequestBody ProductRequest productRequest) {
        productService.saveProduct(productRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity deleteProduct(@RequestParam int id){
        productService.deleteProductById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getProduct(@RequestParam int id){
        Optional<ProductResponse> product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity updateProduct(@RequestBody ProductRequest productRequest) {
        productService.saveProduct(productRequest);
        return new ResponseEntity(HttpStatus.OK);
    }
}
