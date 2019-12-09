import { Injectable } from '@angular/core';
import { Role } from './role.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  formData : Role;

  list : Role[];

  readonly rootUrl : string = 'https://localhost:44328/api/roles';


  constructor(private http : HttpClient) {  }

  post(){
    return this.http.post(this.rootUrl, this.formData);
  }

  put(){
    return this.http.put(this.rootUrl + '/' + this.formData.roleId, this.formData);
  }

  delete(id){
    return this.http.delete(this.rootUrl + '/' + id);
  }

  refreshList(){
    this.http.get(this.rootUrl)
    .toPromise()
    .then(res => this.list = res as Role[]);
  }
}
