import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from 'src/app/shared/product-type.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styles: []
})
export class ProductTypeComponent implements OnInit {

  constructor(private productTypeService : ProductTypeService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  populateFormrs(ul){
    this.productTypeService.formData = {
      typeId: 0,
      typeName: '',
      createdDate: null,
      updatedDate: null,
      mobileIcon: ''
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.productTypeService.formData = {
      typeId: 0,
      typeName: '',
      createdDate: null,
      updatedDate: null,
      mobileIcon: '',
    }
  }

  onSubmit(form:NgForm){
      this.insertRecord(form);
  }

  insertRecord(form:NgForm){
    this.productTypeService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submmitted Successfully', 'Product Type Added');
        this.productTypeService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
