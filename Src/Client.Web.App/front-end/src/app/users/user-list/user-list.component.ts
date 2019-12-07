import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ProductService } from 'src/app/shared/product.service';
import { ShipmentService } from 'src/app/shared/shipment.service';
import { VariantService } from 'src/app/shared/variant.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  searchText;

  userID : number;
  orderID: number;

  constructor(private userService : UserService, private toastr : ToastrService, 
    private orderService : OrderService, private orderDetailService : OrderDetailService,
    private productService : ProductService, private shipmentService : ShipmentService,
    private variantService : VariantService ) { }

  ngOnInit() {
    this.userService.refreshList();
    this.orderService.refreshList();
    this.orderDetailService.refreshList();
    this.productService.refreshList();
    this.shipmentService.refreshList();
    this.variantService.refreshList();
    this.resetForm();
  }

  getID(id : number){
    this.userID = id;
    console.log(this.userID);
    console.log(this.orderService.list);
  }

  getOrderID(id : number){
    this.orderID = id;
  }

  populateForm(ul : User){
    this.userService.formData = Object.assign({}, ul);
  }

  onSubmit(form:NgForm){
    this.updateRecord(form);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.userService.delete(id)
      .subscribe(res => {
        this.userService.refreshList();
        this.toastr.warning('Deleted Successfully', 'User deleted');
      },
        err => {
          console.log(err);
        })
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.userService.formData = {
      userId: 0,
      userAvatar: '',
      userName: '',
      userPassword: '',
      userPhone: '',
      userEmail: '',
      userAddress: '',
      userDayOfBirth: null,
      status: 0,
      createdDate: null,
      updatedDate: null,
    };
  }

  updateRecord(form:NgForm){
    this.userService.put().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submmitted Successfully', 'User Updated');
        this.userService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
