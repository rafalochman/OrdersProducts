package pl.edu.wat.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.wat.backend.dtos.OrderRequest;
import pl.edu.wat.backend.dtos.OrderResponse;
import pl.edu.wat.backend.entities.OrderEntity;
import pl.edu.wat.backend.repositories.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return StreamSupport.stream(orderRepository.findAll().spliterator(), false)
                .map(entity -> new OrderResponse(entity.getId(), entity.getCustomerName(), entity.getStoreName(), entity.getOrderDate()))
                .collect(Collectors.toList());
    }

    @Override
    public void addOrder(OrderRequest orderRequest) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(orderRequest.getId());
        orderEntity.setCustomerName(orderRequest.getCustomerName());
        orderEntity.setStoreName(orderRequest.getStoreName());
        orderEntity.setOrderDate(orderRequest.getOrderDate());

        orderRepository.save(orderEntity);
    }
}
