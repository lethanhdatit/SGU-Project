import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from 'src/app/shared/product-type.service';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from 'src/app/shared/product-type.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styles: []
})
export class ProductTypeListComponent implements OnInit {
  searchText;

  constructor(private productTypeService : ProductTypeService, private toastr : ToastrService) { }

  ngOnInit() {
    this.productTypeService.refreshList();
    this.resetForm();
  }

  populateForm(ul : ProductType){
    this.productTypeService.formData = Object.assign({}, ul);
  }

  onSubmit(form:NgForm){
    this.updateRecord(form);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.productTypeService.delete(id)
      .subscribe(res => {
        this.productTypeService.refreshList();
        this.toastr.warning('Deleted Successfully', 'Product Type deleted');
      },
        err => {
          console.log(err);
        })
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

  updateRecord(form:NgForm){
    this.productTypeService.put().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submmitted Successfully', 'Product Type Updated');
        this.productTypeService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
