import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: []
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderDetailService : OrderDetailService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetFormDetail();
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

  

}
