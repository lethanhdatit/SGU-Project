import { Component } from '@angular/core';
import { Store, State } from '@ngrx/store';
import {Observable, from} from "rxjs";
import {User} from "./shared/user.model";
import { UserState, getLogin } from './_reducers';
import { Router, ActivatedRoute } from '@angular/router';
import * as userLogins from './_actions/userActions';
import { UserService } from './shared/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'front-end';
  dataUser:any=[]
    constructor(private _store:Store<UserState>,private router:Router, private userService : UserService){
        this._store.select(getLogin).subscribe(item=>{
             this.dataUser = item;
             console.log(item)
        });
    }
    logout = ()=>{
        this._store.dispatch(new userLogins.LogoutLoginAction);
        this.router.navigate(['/login']);
    }
}
