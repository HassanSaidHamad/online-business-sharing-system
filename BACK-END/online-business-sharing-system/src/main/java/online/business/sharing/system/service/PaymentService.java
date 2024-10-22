package online.business.sharing.system.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import online.business.sharing.system.model.Order;
import online.business.sharing.system.model.Payment;
import online.business.sharing.system.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final OrderService orderService;
    private final UserService userService;


    public Payment makePayment(double amount, long orderId) {
        Payment payment = new Payment();
        Order order = orderService.findByOrder(orderId);
        order.setStatus("Ordered");
        payment.setPaymentAmount(amount);
        payment.setOrder(order);
        payment.setStatus("Paid");
        payment.setPaymentDate(new Date());
        log.info("Payment paid successfully");
        return paymentRepository.save(payment);
    }



    public Payment updatePayment(double paymentAmount, String paymentStatus, long paymentId) {
        Payment updatePayment = findPayment(paymentId);
        updatePayment.setPaymentAmount(paymentAmount);
        updatePayment.setStatus(paymentStatus);
        log.info("Payment updated successfully");
        return paymentRepository.save(updatePayment);
    }




    public List<Payment> getPayments() {
        return paymentRepository.findAll();
    }


    public List<Payment> getPaymentsByCustomerUsername(String username) {
        return paymentRepository.getPaymentsByCustomerUsername(username);
    }



    public Long getTotalPayments() {
        return paymentRepository.getTotalPayments();
    }


    public Payment findPayment(long paymentId) {
        Payment payment = paymentRepository.findPaymentByPaymentId(paymentId);
        if (payment == null) {
            throw new RuntimeException("Payment by ID: " + paymentId + " not found");
        } else {
            return payment;
        }
    }


    //    delete Payment
    public void deletePayment(long paymentId) {
        Payment payment = findPayment(paymentId);
            paymentRepository.deleteById(payment.getPaymentId());
    }


}
