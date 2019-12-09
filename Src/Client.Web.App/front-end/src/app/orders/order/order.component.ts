import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  constructor(private orderService : OrderService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  populateFormrs(ul){
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

  onSubmit(form:NgForm){
    this.insertRecord(form);
}

  insertRecord(form:NgForm){
    this.orderService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submmitted Successfully', 'Order Added');
        this.orderService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
