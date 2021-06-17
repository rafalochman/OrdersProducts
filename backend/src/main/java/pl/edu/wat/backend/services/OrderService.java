package pl.edu.wat.backend.services;

import pl.edu.wat.backend.dtos.OrderRequest;
import pl.edu.wat.backend.dtos.OrderResponse;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<OrderResponse> getAllOrders();

    void saveOrder(OrderRequest orderRequest);

    void deleteOrderById(int id);

    Optional<OrderResponse> getOrderById(int id);

    void fillDB();
}
