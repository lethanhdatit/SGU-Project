import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductsComponent } from './products/products.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { OriginsComponent } from './origins/origins.component';
import { TrademarksComponent } from './trademarks/trademarks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  // {path: '', redirectTo: '/login', pathMatch: 'full'}, 
  //{path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent},
  {path: 'users/user', component: UsersComponent},
  {path: 'shipments/shipment', component: ShipmentsComponent},
  {path: 'orders/order', component: OrdersComponent},
  {path: 'orders/order-detail', component: OrderDetailsComponent},
  {path: 'products/product', component: ProductsComponent},
  {path: 'products/product-type', component: ProductTypesComponent},
  {path: 'products/origin', component: OriginsComponent},
  {path: 'products/trademark', component: TrademarksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
