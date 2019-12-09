import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductType } from './product-type.model';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  formData: ProductType;

  list: ProductType[];

  readonly rootUrl : string = 'https://localhost:44328/api/producttypes';

  constructor(private http : HttpClient) { }

  post(){
    return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.typeId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as ProductType[]);
  }
}
