import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public users!: User[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public totalCustomers!: number;
  public totalProducts!: number;
  public totalOrders!: number;
  public totalPayments!: number;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getTotalCustomers();
    this.getTotalProducts();
    this.getTotalOrders();
    this.getTotalPayments();
  }

  public getAllUsers(): void {
    this.userService.fetchAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch users.');
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllUsers();
  }

  public getTotalCustomers(): void {
    this.userService.getTotalCustomers().subscribe(
      (response: number) => {
        this.totalCustomers = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch customers.');
      }
    );
  }

  public getTotalProducts(): void {
    this.productService.getTotalProducts().subscribe(
      (response: number) => {
        this.totalProducts = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch products.');
      }
    );
  }

  public getTotalOrders(): void {
    this.orderService.getTotalOrders().subscribe(
      (response: number) => {
        this.totalOrders = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch customers.');
      }
    );
  }

  public getTotalPayments(): void {
    this.paymentService.getTotalPayments().subscribe(
      (response: number) => {
        this.totalPayments = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to fetch payments.');
      }
    );
  }

  // GET USER ROLES
  public getUserRole(): string {
    return this.authService.getUserToLocalStorage().role;
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ROLE_ADMIN;
  }

  public get isCustomer(): boolean {
    return this.getUserRole() === Role.ROLE_CUSTOMER;
  }
}
