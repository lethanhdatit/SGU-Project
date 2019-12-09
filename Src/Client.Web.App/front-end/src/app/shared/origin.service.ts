import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Origin } from './origin.model';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  formData: Origin;

  list: Origin[];

  readonly rootUrl : string = 'https://localhost:44328/api/origins';

  constructor(private http : HttpClient) { }

  post(){
    return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.originId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as Origin[]);
  }
}
