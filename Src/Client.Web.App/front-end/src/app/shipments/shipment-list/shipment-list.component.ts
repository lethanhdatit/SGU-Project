import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/shared/shipment.service';
import { ToastrService } from 'ngx-toastr';
import { Shipment } from 'src/app/shared/shipment.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styles: []
})
export class ShipmentListComponent implements OnInit {
  searchText;

  orderID : number;
  shipmentID : number;

  constructor(private shipmentService : ShipmentService, private toastr : ToastrService, 
    private orderService : OrderService, private userService : UserService) { }

  ngOnInit() {
    this.shipmentService.refreshList();
    this.orderService.refreshList();
    this.userService.refreshList();
    this.resetForm();
  }

  getShipmentID(id : number){
    this.shipmentID = id;
  }

  getOrderID(id : number){
    this.orderID = id;
  }

  populateForm(ul : Shipment){
    this.shipmentService.formData = Object.assign({}, ul);
  }

  onSubmit(form:NgForm){
    this.updateRecord(form);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.shipmentService.delete(id)
      .subscribe(res => {
        this.shipmentService.refreshList();
        this.toastr.warning('Deleted Successfully', 'Shipment deleted');
      },
        err => {
          console.log(err);
        })
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.shipmentService.formData = {
      shipmentId: 0,
      shipmentName: '',
      price: null,
      status: null,
      createdDate: null,
      updatedDate: null,
    }
  }

  updateRecord(form:NgForm){
    this.shipmentService.put().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submmitted Successfully', 'Shipment Updated');
        this.shipmentService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
