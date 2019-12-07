import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Variant } from './variant.model';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  formData : Variant;

  list : Variant[];

  readonly rootUrl : string = 'https://localhost:44328/api/variants';


  constructor(private http : HttpClient) {  }

  post(){
    return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.variantId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as Variant[]);
  }
}
