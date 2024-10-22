import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-customer-payment-list',
  templateUrl: './customer-payment-list.component.html',
  styleUrls: ['./customer-payment-list.component.css'],
})
export class CustomerPaymentListComponent {
  public payments!: Payment[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public productImage!: File;
  public currentUser!: User;

  constructor(
    private paymentService: PaymentService,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserToLocalStorage();
    this.getAllPayments();
  }

  public getAllPayments(): void {
    this.paymentService
      .getPaymentByUsername(this.currentUser.username)
      .subscribe(
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
