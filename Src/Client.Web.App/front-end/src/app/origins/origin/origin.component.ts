import { Component, OnInit } from '@angular/core';
import { OriginService } from 'src/app/shared/origin.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styles: []
})
export class OriginComponent implements OnInit {

  constructor(private originService : OriginService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  populateFormrs(ul){
    this.originService.formData = {
      originId: 0,
      originName: '',
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.originService.formData = {
      originId: 0,
      originName: '',
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  onSubmit(form:NgForm){
      this.insertRecord(form);
  }

  insertRecord(form:NgForm){
    this.originService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submmitted Successfully', 'Origin Added');
        this.originService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
