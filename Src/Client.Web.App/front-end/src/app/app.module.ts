import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/user.service';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ShipmentComponent } from './shipments/shipment/shipment.component';
import { ShipmentListComponent } from './shipments/shipment-list/shipment-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { ProductTypeComponent } from './product-types/product-type/product-type.component';
import { ProductTypeListComponent } from './product-types/product-type-list/product-type-list.component';
import { OriginsComponent } from './origins/origins.component';
import { OriginComponent } from './origins/origin/origin.component';
import { OriginListComponent } from './origins/origin-list/origin-list.component';
import { TrademarksComponent } from './trademarks/trademarks.component';
import { TrademarkComponent } from './trademarks/trademark/trademark.component';
import { TrademarkListComponent } from './trademarks/trademark-list/trademark-list.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderDetailComponent } from './order-details/order-detail/order-detail.component';
import { OrderDetailListComponent } from './order-details/order-detail-list/order-detail-list.component';
import { OrderService } from './shared/order.service';
import { OrderDetailService } from './shared/order-detail.service';
import { ProductService } from './shared/product.service';
import { ProductTypeService } from './shared/product-type.service';
import { OriginService } from './shared/origin.service';
import { TrademarkService } from './shared/trademark.service';
import { ShipmentService } from './shared/shipment.service';
import {DatePipe} from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UserRoleService } from './shared/user-role.service';
import { VariantService } from './shared/variant.service';
import { RoleService } from './shared/role.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from "@ngrx/store";
import { reducers } from './_reducers';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserListComponent,
    ShipmentsComponent,
    ShipmentComponent,
    ShipmentListComponent,
    ProductsComponent,
    ProductComponent,
    ProductListComponent,
    ProductTypesComponent,
    ProductTypeComponent,
    ProductTypeListComponent,
    OriginsComponent,
    OriginComponent,
    OriginListComponent,
    TrademarksComponent,
    TrademarkComponent,
    TrademarkListComponent,
    OrdersComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderDetailComponent,
    OrderDetailListComponent,
    DashboardComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DatePickerModule,
    ReactiveFormsModule,
    StoreModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    UserService,
    OrderService,
    OrderDetailService,
    ProductService,
    ProductTypeService,
    OriginService,
    TrademarkService,
    ShipmentService,
    RoleService,
    UserRoleService,
    VariantService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
