import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ToastrService } from 'ngx-toastr';
import { OrderDetail } from 'src/app/shared/order-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styles: []
})
export class OrderDetailListComponent implements OnInit {
  searchText;

  constructor(private orderDetailService : OrderDetailService, private toastr : ToastrService) { }

  ngOnInit() {
    this.orderDetailService.refreshList();
    this.resetFormDetailList();
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

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.orderDetailService.delete(id)
      .subscribe(res => {
        this.orderDetailService.refreshList();
        this.toastr.warning('Deleted Successfully', 'Order Detail deleted');
      },
        err => {
          console.log(err);
        })
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
