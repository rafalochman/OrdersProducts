package pl.edu.wat.backend.services;

import pl.edu.wat.backend.dtos.OrderRequest;
import pl.edu.wat.backend.dtos.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getAllOrders();

    void addOrder(OrderRequest orderRequest);
}
