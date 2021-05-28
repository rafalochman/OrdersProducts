package pl.edu.wat.backend.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String description;
    private double price;

    @ManyToOne
    private OrderEntity order;
}