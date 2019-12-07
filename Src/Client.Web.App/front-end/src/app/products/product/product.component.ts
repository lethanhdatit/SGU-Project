import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  constructor(private productService : ProductService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  populateFormrs(ul){
    this.productService.formData = {
      productId: 0,
      productTypeId: null,
      productPrice: null,
      originId: null,
      trademarkId: null,
      productName: '',
      productInfomation: '',
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.productService.formData = {
      productId: 0,
      productTypeId: null,
      productPrice: null,
      originId: null,
      trademarkId: null,
      productName: '',
      productInfomation: '',
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  onSubmit(form:NgForm){
    this.insertRecord(form);
}

  insertRecord(form: NgForm){
    this.productService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submmitted Successfully', 'Product Added');
        this.productService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  

}
