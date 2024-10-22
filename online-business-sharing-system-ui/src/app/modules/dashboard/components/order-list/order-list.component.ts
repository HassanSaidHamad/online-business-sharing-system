import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  public orders!: Order[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public productImage!: File;
  public updatedOrder = new Order();

  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  public getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
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

  public replyOrder(order: Order): void {
    this.orderService.replyOrder(order, this.updatedOrder.orderId).subscribe(
      (successResponse: Order) => {
        document.getElementById('closeRepForm')?.click();
        this.getAllOrders();
        this.toastService.toastSuccess('Order updated successfully.');
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('An error occured while processing.');
      }
    );
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

  public deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      (successResponse: void) => {
        this.toastService.toastSuccess('Order deleted succeffully.');
        this.getAllOrders();
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('An error occured while processing.');
      }
    );
  }
}
