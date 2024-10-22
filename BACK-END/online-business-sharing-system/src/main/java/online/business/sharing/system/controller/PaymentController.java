package online.business.sharing.system.controller;

import lombok.RequiredArgsConstructor;
import online.business.sharing.system.model.Payment;
import online.business.sharing.system.model.dto.PaymentRequestDTO;
import online.business.sharing.system.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;


    //    add Payment
    @PostMapping("/makePayment/order/{orderId}")
    public ResponseEntity<Payment> makePayment(@RequestBody PaymentRequestDTO requestDTO, @PathVariable long orderId) {
        Payment makePayment = paymentService.makePayment(requestDTO.getAmount(), orderId);
        return new ResponseEntity<>(makePayment, HttpStatus.CREATED);
    }


    //    update Payment
    @PutMapping("/update/{paymentId}")
    public ResponseEntity<Payment> updatePayment(@RequestBody Payment payment, @PathVariable long paymentId) {
        Payment updatePayment = paymentService.updatePayment(payment.getPaymentAmount(), payment.getStatus(), paymentId);
        return new ResponseEntity<>(updatePayment, HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentService.getPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }



    @GetMapping("/all/customer/{username}")
    public ResponseEntity<List<Payment>> getPaymentsByCustomerUsername(@PathVariable String username) {
        List<Payment> payments = paymentService.getPaymentsByCustomerUsername(username);
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }


    @GetMapping("/total-payments")
    public ResponseEntity<Long> getTotalPayments() {
        Long totalPayments = paymentService.getTotalPayments();
        return new ResponseEntity<>(totalPayments, HttpStatus.OK);
    }



    @GetMapping("/{paymentId}")
    public ResponseEntity<Payment> findPayment(@PathVariable long paymentId) {
        Payment booking = paymentService.findPayment(paymentId);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{paymentId}")
    public ResponseEntity<?> deletePayment(@PathVariable long paymentId) {
        paymentService.deletePayment(paymentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
