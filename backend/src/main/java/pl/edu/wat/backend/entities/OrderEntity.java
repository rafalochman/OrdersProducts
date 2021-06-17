package pl.edu.wat.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Date;

@Entity
@Data
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String customerName;
    private String storeName;

    @JsonFormat(pattern = "dd.MM.yyyy")
    private Date orderDate;

    @OneToMany(mappedBy = "order", orphanRemoval = true)
    private List<ProductEntity> products;
}