import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/shared/order.model';
import { NgForm } from '@angular/forms';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { OrderDetail } from 'src/app/shared/order-detail.model';
import { VariantService } from 'src/app/shared/variant.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {
  searchText;

  order_ID : number;
  variantID: number;

  constructor(private orderService : OrderService, private toastr : ToastrService,
    private orderDetailService : OrderDetailService, private variantService : VariantService,
    private productService : ProductService ) { }

  ngOnInit() {
    this.orderService.refreshList();
    this.orderDetailService.refreshList();
    this.variantService.refreshList();
    this.productService.refreshList();
    this.resetForm();
    this.resetFormDetail();
    this.resetFormDetailList();
  }

  getOrderID(id: number){
    this.order_ID = id;
  }

  getVariantID(id:number) : number{
    this.variantID = id;
    console.log(this.variantID);
    return this.variantID;
  }

  populateForm(ul : Order){
    this.orderService.formData = Object.assign({}, ul);
  }

  onSubmit(form:NgForm){
    this.updateRecord(form);
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.orderService.formData = {
      orderId: 0,
      userId: null,
      orderStatus: false,
      orderDate: '',
      orderPhone: '',
      orderAddress: '',
      orderPrice: null,
      shipmentId: null,
      orderNote: '',
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.orderService.delete(id)
      .subscribe(res => {
        this.orderService.refreshList();
        this.toastr.warning('Deleted Successfully', 'Order deleted');
      },
        err => {
          console.log(err);
        })
    }
  }

  updateRecord(form:NgForm){
    this.orderService.put().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submmitted Successfully', 'Order Updated');
        this.orderService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  populateFormrsDetail(ul){
    this.orderDetailService.formData = {
      detailId: 0,
      orderId: null,
      variantId: null,
      quantity: null,
      price: null
    }
  }

  resetFormDetail(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.orderDetailService.formData = {
      detailId: 0,
      orderId: null,
      variantId: null,
      quantity: null,
      price: null
    }
  }

  onSubmitDetail(form:NgForm){
      this.insertRecordDetail(form);
  }

  insertRecordDetail(form:NgForm){
    this.orderDetailService.post().subscribe(
      res => {
        this.resetFormDetail(form);
        this.toastr.success('Submmitted Successfully', 'Detail Order Added');
        this.orderDetailService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  populateFormDetailList(ul : OrderDetail){
    this.orderDetailService.formData = Object.assign({}, ul);
  }

  onSubmitDetailList(form:NgForm){
    this.updateRecordDetailList(form);
  }

  resetFormDetailList(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.orderDetailService.formData = {
      detailId: 0,
      orderId: null,
      variantId: null,
      quantity: null,
      price: null
    }
  }

  updateRecordDetailList(form:NgForm){
    this.orderDetailService.put().subscribe(
      res => {
        this.resetFormDetailList(form);
        this.toastr.info('Submmitted Successfully', 'Detail Order Updated');
        this.orderDetailService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
