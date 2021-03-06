package pl.edu.wat.backend.services;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import pl.edu.wat.backend.dtos.OrderRequest;
import pl.edu.wat.backend.dtos.OrderResponse;
import pl.edu.wat.backend.dtos.ProductRequest;
import pl.edu.wat.backend.dtos.ProductResponse;
import pl.edu.wat.backend.entities.OrderEntity;
import pl.edu.wat.backend.repositories.OrderRepository;

import java.util.*;
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
    public void saveOrder(OrderRequest orderRequest) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setId(orderRequest.getId());
        orderEntity.setCustomerName(orderRequest.getCustomerName());
        orderEntity.setStoreName(orderRequest.getStoreName());
        orderEntity.setOrderDate(orderRequest.getOrderDate());

        orderRepository.save(orderEntity);
    }

    public void deleteOrderById(int id) {
        orderRepository.deleteById(id);
    }

    public Optional<OrderResponse> getOrderById(int id){
        return orderRepository.findById(id).map(entity -> new OrderResponse(entity.getId(), entity.getCustomerName(), entity.getStoreName(), entity.getOrderDate()));
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB(){
        saveOrder(new OrderRequest(1,"Jan Kowalski", "Sport store", new GregorianCalendar(2021, Calendar.JULY, 17).getTime()));
        saveOrder(new OrderRequest(2,"Kamil Nowak", "Sport store", new GregorianCalendar(2021, Calendar.JULY, 16).getTime()));
    }
}
