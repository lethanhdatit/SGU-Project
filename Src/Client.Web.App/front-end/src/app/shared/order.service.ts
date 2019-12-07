import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order;

  list: Order[];

  readonly rootUrl : string = 'https://localhost:44328/api/orders';

  constructor(private http : HttpClient) { }

  post(){
    return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.orderId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as Order[]);
  }
}
