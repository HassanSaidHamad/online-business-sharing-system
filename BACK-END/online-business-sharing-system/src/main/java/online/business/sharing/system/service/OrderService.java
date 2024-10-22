package online.business.sharing.system.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.business.sharing.system.model.Order;
import online.business.sharing.system.model.Product;
import online.business.sharing.system.model.User;
import online.business.sharing.system.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductService productService;

    public Order makeOrder(String description, String orderQuantity, long customerId, long productId) {
        Order order = new Order();
        User customer = userService.findUserByUserId(customerId);
        Product product = productService.findByProduct(productId);
        order.setCustomer(customer);
        order.setProduct(product);
        order.setDescription(description);
        order.setOrderQuantity(orderQuantity);
        order.setStatus("Pending");
        order.setOrderDate(new Date());
        log.info("Order ordered successfully.");
        return orderRepository.save(order);
    }


    public Order updateProduct(String orderQuantity, String description, String orderStatus, long orderId) {
        Order updateOrder = findByOrder(orderId);
        updateOrder.setOrderQuantity(orderQuantity);
        updateOrder.setDescription(description);
        updateOrder.setStatus(orderStatus);
        log.info("Order update successfully");
        orderRepository.save(updateOrder);
        return updateOrder;
    }


    public Order replyOrder(String orderStatus, long orderId) {
        Order updateOrder = findByOrder(orderId);
        updateOrder.setStatus(orderStatus);
        log.info("Order update successfully");
        orderRepository.save(updateOrder);
        return updateOrder;
    }


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getAllOrdersByCustomerUsername(String username) {
        return orderRepository.getAllOrdersByCustomerUsername(username);
    }


    //    getTotalUsers
    public Integer getTotalOrders() {
        return orderRepository.getTotalOrders();
    }


    //    findByOrderId
    public Order findByOrder(long orderId) {
        Order order = orderRepository.findByOrderId(orderId);
        if (order == null) {
            throw new RuntimeException("Order by ID: " + orderId + " not found");
        } else {
            return order;
        }
    }


    //    deleteOrder
    public void deleteOrder(long orderId) {
        Order order = findByOrder(orderId);
        log.info("Order deleted successfully.");
        orderRepository.deleteById(order.getOrderId());
    }


}



