import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from './order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  formData: OrderDetail;

  list: OrderDetail[];

  readonly rootUrl : string = 'https://localhost:44328/api/orderdetails';

  constructor(private http : HttpClient) { }

  post(){
    return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.detailId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as OrderDetail[]);
  }
}
