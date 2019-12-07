import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { NgForm } from '@angular/forms';
import { ProductTypeService } from 'src/app/shared/product-type.service';
import { OriginService } from 'src/app/shared/origin.service';
import { TrademarkService } from 'src/app/shared/trademark.service';
import { VariantService } from 'src/app/shared/variant.service';
import { Variant } from 'src/app/shared/variant.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  searchText;
  productID : number;

  constructor(private productService : ProductService, private toastr : ToastrService, 
    private productTypeService : ProductTypeService, private originService : OriginService,
    private trademarkService : TrademarkService, private variantService : VariantService) { }

  ngOnInit() {
    this.productService.refreshList();
    this.productTypeService.refreshList();
    this.originService.refreshList();
    this.trademarkService.refreshList();
    this.variantService.refreshList();
    this.resetForm();
    this.resetFormVariant();
  }

  populateForm(ul : Product){
    this.productService.formData = Object.assign({}, ul);
  }

  onSubmit(form:NgForm){
    this.updateRecord(form);
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

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.productService.delete(id)
      .subscribe(res => {
        this.productService.refreshList();
        this.toastr.warning('Deleted Successfully', 'Product deleted');
      },
        err => {
          console.log(err);
        })
    }
  }

  updateRecord(form:NgForm){
    this.productService.put().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submmitted Successfully', 'Product Updated');
        this.productService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  getProductID(id : number){
    this.productID = id;
  }

  formrs(ul){
    this.variantService.formData = {
      variantId: 0,
      productId: 0,
      variantSize: '',
      variantColor: '',
      variantImage: '',
      stock: 0,
      status: 0
    }
  }

  populateFormVariant(ul : Variant){
    this.variantService.formData = Object.assign({}, ul);
  }

  onSubmitVariantAdd(form: NgForm){
    this.insertVariantRecord(form);
  }

  onSubmitVariantUpdate(form: NgForm){
    this.updateVariantRecord(form);
  }

  resetFormVariant(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.variantService.formData = {
      variantId: 0,
      productId: 0,
      variantSize: '',
      variantColor: '',
      variantImage: '',
      stock: 0,
      status: 0
    }
  }

  insertVariantRecord(form:NgForm){
    this.variantService.post().subscribe(
      res => {
        this.resetFormVariant(form);
        this.toastr.success('Submmitted Successfully', 'Variant Added');
        this.variantService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  updateVariantRecord(form:NgForm){
    this.variantService.put().subscribe(
      res => {
        this.resetFormVariant(form);
        this.toastr.info('Submmitted Successfully', 'Variant Updated');
        this.variantService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
