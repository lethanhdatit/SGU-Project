import { Injectable } from '@angular/core';
import { Shipment } from './shipment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  formData: Shipment;

  list : Shipment[];

  readonly rootUrl : string = 'https://localhost:44328/api/shipments';

  constructor(private http : HttpClient) { }

  post(){
    return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.shipmentId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as Shipment[]);
  }
}
