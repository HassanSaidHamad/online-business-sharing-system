import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css'],
})
export class CustomerOrderListComponent {
  public orders!: Order[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public currentUser!: User;
  public updatedOrder = new Order();

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserToLocalStorage();
    this.getAllOrders();
  }

  public getAllOrders(): void {
    this.orderService.getOrdersByUsername(this.currentUser.username).subscribe(
      (response: Order[]) => {
        this.orders = response;
      },
      (error: HttpErrorResponse) => {
        this.toastService.toastError('Failed to fetch orders.');
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllOrders();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllOrders();
  }

  public findOrder(orderId: number): void {
    this.orderService.findOrder(orderId).subscribe(
      (successResponse: Order) => {
        this.updatedOrder = successResponse;
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('An error occured while processing.');
      }
    );
  }

  public makePayment(payment: Payment): void {
    this.paymentService
      .makePayment(payment, this.updatedOrder.orderId)
      .subscribe(
        (response: Payment) => {
          document.getElementById('closePayForm')?.click();
          this.getAllOrders();
          this.toastService.toastSuccess('Payment made successfully.');
        },
        (error: HttpErrorResponse) => {
          this.toastService.toastError('Failed to make payment.');
        }
      );
  }
}
