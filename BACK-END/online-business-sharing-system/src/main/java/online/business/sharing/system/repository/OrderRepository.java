package online.business.sharing.system.repository;

import online.business.sharing.system.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByOrderId(long orderId);

    @Query("SELECT COUNT(*) FROM Order o")
    Integer getTotalOrders();

    @Query("SELECT o FROM Order o JOIN o.customer c WHERE c.username = ?1")
    List<Order> getAllOrdersByCustomerUsername(String username);
}
