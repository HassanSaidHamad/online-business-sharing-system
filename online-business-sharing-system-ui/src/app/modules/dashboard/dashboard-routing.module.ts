import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { CustomerOrderListComponent } from './components/customer-order-list/customer-order-list.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { CustomerPaymentListComponent } from './components/customer-payment-list/customer-payment-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'update-user/:userId', component: UpdateUserComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'view-product/:productId', component: ViewProductComponent },
      { path: 'order-list', component: OrderListComponent },
      { path: 'my-order-list', component: CustomerOrderListComponent },
      { path: 'make-order/:productId', component: MakeOrderComponent },
      { path: 'payment-list', component: PaymentListComponent },
      { path: 'my-payment-list', component: CustomerPaymentListComponent },
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
