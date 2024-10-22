import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { CustomerOrderListComponent } from './components/customer-order-list/customer-order-list.component';
import { CustomerPaymentListComponent } from './components/customer-payment-list/customer-payment-list.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UserListComponent,
    UserProfileComponent,
    UpdateUserComponent,
    PaymentListComponent,
    ProductListComponent,
    OrderListComponent,
    CustomerOrderListComponent,
    CustomerPaymentListComponent,
    MakeOrderComponent,
    CreateProductComponent,
    ViewProductComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class DashboardModule {}
