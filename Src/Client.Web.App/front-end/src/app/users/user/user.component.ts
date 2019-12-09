import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  constructor(private userService : UserService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  populateFormrs(ul){
    this.userService.formData = {
      userId: 0,
      userAvatar: '',
      userName: '',
      userPassword: '',
      userPhone: '',
      userEmail: '',
      userAddress: '',
      userDayOfBirth: null,
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.userService.formData = {
      userId: 0,
      userAvatar: '',
      userName: '',
      userPassword: '',
      userPhone: '',
      userEmail: '',
      userAddress: '',
      userDayOfBirth: null,
      status: 0,
      createdDate: null,
      updatedDate: null,
    };
  }

  onSubmit(form:NgForm){
      this.insertRecord(form);
  }

  insertRecord(form:NgForm){
    this.userService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submmitted Successfully', 'User Added');
        this.userService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
