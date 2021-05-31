package pl.edu.wat.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import pl.edu.wat.backend.controllers.OrderController;
import pl.edu.wat.backend.dtos.OrderResponse;
import pl.edu.wat.backend.dtos.ProductResponse;
import pl.edu.wat.backend.repositories.OrderRepository;
import pl.edu.wat.backend.repositories.ProductRepository;
import pl.edu.wat.backend.services.OrderService;
import pl.edu.wat.backend.services.ProductService;

import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc

class BackendApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    @Test
    public void testGetOrders() throws Exception{
        List<OrderResponse> products = new ArrayList<>();
        products.add(new OrderResponse(1,"test","test", new Date()));
        products.add(new OrderResponse(2,"test2","test2", new Date()));
        products.add(new OrderResponse(3,"test3","test3", new Date()));
        Mockito.when(orderService.getAllOrders()).thenReturn(products);

        String url = "/api/order/all";
        MvcResult mvcResult = mockMvc.perform(get(url)).andExpect(status().isOk()).andReturn();

        String actualJsonResponse = mvcResult.getResponse().getContentAsString();
        String expectedJsonResponse = objectMapper.writeValueAsString(products);
        assertThat(actualJsonResponse).isEqualToIgnoringWhitespace(expectedJsonResponse);
    }

}
