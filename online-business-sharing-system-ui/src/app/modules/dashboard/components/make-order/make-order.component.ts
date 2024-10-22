import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css'],
})
export class MakeOrderComponent {
  public product!: Product;
  public currentUser!: User;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductInfo();
    this.currentUser = this.authService.getUserToLocalStorage();
  }

  public getProductInfo(): void {
    const productId = this.activatedRoute.snapshot.params['productId'];
    this.productService.findProduct(productId).subscribe(
      (response: Product) => {
        this.product = response;
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('An error occured while processing.');
      }
    );
  }

  public makeOrder(order: Order): void {
    this.orderService
      .makeOrder(order, this.currentUser.userId, this.product.productId)
      .subscribe(
        (response: Order) => {
          this.router.navigateByUrl('/dashboard/my-order-list');
          this.toastService.toastSuccess('Order placed successfully.');
        },
        (errorResponse: HttpErrorResponse) => {
          this.toastService.toastError('Failed to place order.');
        }
      );
  }
}
