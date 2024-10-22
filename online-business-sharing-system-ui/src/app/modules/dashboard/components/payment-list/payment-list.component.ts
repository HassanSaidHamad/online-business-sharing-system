import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Payment } from 'src/app/models/payment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent {
  public payments!: Payment[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public productImage!: File;

  constructor(
    private paymentService: PaymentService,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPayments();
  }

  public getAllPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (response: Payment[]) => {
        this.payments = response;
      },
      (error: HttpErrorResponse) => {
        this.toastService.toastError('Failed to fetch payments.');
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllPayments();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllPayments();
  }
}
