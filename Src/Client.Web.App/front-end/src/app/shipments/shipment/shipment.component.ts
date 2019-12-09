import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/shared/shipment.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styles: []
})
export class ShipmentComponent implements OnInit {

  constructor(private shipmentService : ShipmentService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  populateFormrs(ul){
    this.shipmentService.formData = {
      shipmentId: 0,
      shipmentName: '',
      price: 0,
      status: 0,
      createdDate: null,
      updatedDate: null,
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

  onSubmit(form:NgForm){
      this.insertRecord(form);
  }

  insertRecord(form:NgForm){
    this.shipmentService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submmitted Successfully', 'Shipment Added');
        this.shipmentService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
