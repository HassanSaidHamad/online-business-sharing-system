import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { Product } from 'src/app/models/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService as ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  public products!: Product[];
  public pageNumber: number = 1;
  public count: number = 0;
  public tableSize: number = 12;
  public filterSize: any = [5, 10, 15, 20, 25];
  public productImage!: File;
  public updatedProduct = new Product();

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        this.toastService.toastError('Failed to fetch products.');
      }
    );
  }

  public onTableDataChange(event: any): void {
    this.pageNumber = event;
    this.getAllProducts();
  }

  public onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllProducts();
  }

  public createProduct(product: Product): void {
    const formData = this.productService.createProductFormData(
      product,
      this.productImage
    );
    this.productService.createProduct(formData).subscribe(
      (response: Product) => {
        document.getElementById('closeProductForm')?.click();
        this.getAllProducts();
        this.toastService.toastSuccess('New product created.');
      },
      (error: HttpErrorResponse) => {
        this.toastService.toastError('Failed to create new product.');
      }
    );
  }

  public updateProduct(product: Product): void {
    const formData = this.productService.createProductFormData(
      product,
      this.productImage
    );
    this.productService
      .updateProduct(formData, this.updatedProduct.productId)
      .subscribe(
        (response: Product) => {
          document.getElementById('closeUpdateProductForm')?.click();
          this.getAllProducts();
          this.toastService.toastSuccess('Product updated.');
        },
        (error: HttpErrorResponse) => {
          this.toastService.toastError('Failed to update product.');
        }
      );
  }

  public onProductImageChange(productImage: File): void {
    this.productImage = productImage;
  }

  public findProduct(productId: number): void {
    this.productService.findProduct(productId).subscribe(
      (successResponse: Product) => {
        this.updatedProduct = successResponse;
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('An error occured while processing.');
      }
    );
  }

  public getProduct(productId: number): void {
    this.productService.findProduct(productId).subscribe(
      (successResponse: Product) => {
        this.router.navigate(['/dashboard/view-product', productId]);
      },
      (errorResponse: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'An error occured while processing.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  public deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (successResponse: void) => {
        this.toastService.toastSuccess('Product deleted succeffully.');
        this.getAllProducts();
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('An error occured while processing.');
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
