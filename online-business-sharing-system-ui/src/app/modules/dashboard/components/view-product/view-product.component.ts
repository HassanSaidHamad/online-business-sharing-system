import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent {
  public product!: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductInfo();
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

  public getProduct(productId: number): void {
    this.productService.findProduct(productId).subscribe(
      (response: Product) => {
        this.router.navigate(['/dashboard/make-order', productId]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('An error occured while processing.');
      }
    );
  }
}
