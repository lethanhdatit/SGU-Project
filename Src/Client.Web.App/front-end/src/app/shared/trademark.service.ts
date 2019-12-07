import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trademark } from './trademark.model';

@Injectable({
  providedIn: 'root'
})
export class TrademarkService {

  formData : Trademark;

  list : Trademark[];

  readonly rootUrl : string = 'https://localhost:44328/api/trademarks';

  constructor(private http : HttpClient) { }

  post(){
      return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.trademarkId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as Trademark[]);
  }
}
