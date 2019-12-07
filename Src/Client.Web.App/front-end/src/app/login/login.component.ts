import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import {Observable, from} from "rxjs";
import {User} from "../shared/user.model";
import { UserState, getLogin } from '../_reducers';
import { Router, ActivatedRoute } from '@angular/router';
import * as userLogins from '../_actions/userActions';
import { UserService } from '../shared/user.service';
import { UserRoleService } from '../shared/user-role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userID : number;

  isCheckLogin:boolean = false;

  constructor(private _store:Store<UserState>,private router:Router,
    private userService : UserService, private userRoleService : UserRoleService ) { }

  ngOnInit() {
    this.userService.refreshList();
    this.userRoleService.refreshList();
  }

  getUserID(id: number){
    this.userID = id;
    console.log(this.userID);
  }

  onSubmit() {
    //  console.warn(this.profileForm.value['email']);
     this.userService.list.filter(item=>{
         if(item.userEmail==this.profileForm.value['email'] && item.userPassword==this.profileForm.value['password']){
             this.isCheckLogin=true;
             this._store.dispatch(new userLogins.CheckLoginAction({
                 userId:item.userId,
                 userAvatar:item.userAvatar,
                 userName:item.userName,
                 userPassword:item.userPassword,
                 userPhone: item.userPhone,
                 userEmail:item.userEmail,
                 userAddress: item.userAddress,
                 userDayOfBirth: item.userDayOfBirth,
                 status: item.status,
                 createdDate: item.createdDate,
                 updatedDate: item.updatedDate
              }));
              this.getUserID(item.userId);
         }
     });
     if(this.isCheckLogin){
          console.log("Success login");
          this.router.navigate(['/dashboard']);
     }
     else{
         console.log("Fail login");
     }
  }

}
