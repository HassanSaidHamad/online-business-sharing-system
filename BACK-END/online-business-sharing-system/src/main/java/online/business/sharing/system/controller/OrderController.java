package online.business.sharing.system.controller;

import lombok.RequiredArgsConstructor;
import online.business.sharing.system.model.Order;
import online.business.sharing.system.model.dto.OrderRequestDTO;
import online.business.sharing.system.model.dto.OrderStatusDTO;
import online.business.sharing.system.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/make-order/customer/{customerId}/product/{productId}")
    public ResponseEntity<Order> makeOrder(@RequestBody OrderRequestDTO requestDTO, @PathVariable long customerId, @PathVariable long productId) {
        Order makeOrder = orderService.makeOrder(requestDTO.getDescription(), requestDTO.getOrderQuantity(), customerId, productId);
        return new ResponseEntity<>(makeOrder, HttpStatus.CREATED);
    }


    @PutMapping("/update/{orderId}")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order, @PathVariable long orderId) {
        Order updateProduct = orderService.updateProduct(order.getOrderQuantity(), order.getDescription(), order.getStatus(), orderId);
        return new ResponseEntity<>(updateProduct, HttpStatus.OK);
    }


    @PutMapping("/reply-order/{orderId}")
    public ResponseEntity<Order> replyOrder(@RequestBody OrderStatusDTO order, @PathVariable long orderId) {
        Order updateProduct = orderService.replyOrder(order.getStatus(), orderId);
        return new ResponseEntity<>(updateProduct, HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> allOrders = orderService.getAllOrders();
        return new ResponseEntity<>(allOrders, HttpStatus.OK);
    }


    @GetMapping("/total-orders")
    public ResponseEntity<Integer> getTotalOrders() {
        Integer totalOrders = orderService.getTotalOrders();
        return new ResponseEntity<>(totalOrders, HttpStatus.OK);
    }



    @GetMapping("/all/customer/{username}")
    public ResponseEntity<List<Order>> getAllOrdersByCustomerUsername(@PathVariable String username) {
        List<Order> allOrders = orderService.getAllOrdersByCustomerUsername(username);
        return new ResponseEntity<>(allOrders, HttpStatus.OK);
    }



    @GetMapping("/{orderId}")
        public ResponseEntity<Order> findByOrder(@PathVariable long orderId) {
        Order order = orderService.findByOrder(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<Order> deleteOrder(@PathVariable long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
