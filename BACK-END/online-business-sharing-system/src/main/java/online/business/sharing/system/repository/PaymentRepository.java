package online.business.sharing.system.repository;


import online.business.sharing.system.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findPaymentByPaymentId(long paymentId);

    @Query("SELECT SUM(paymentAmount) FROM Payment")
    Long getTotalPayments();

    @Query("SELECT p FROM Payment p JOIN p.order o JOIN o.customer c WHERE c.username = ?1")
    List<Payment> getPaymentsByCustomerUsername(String username);
}
