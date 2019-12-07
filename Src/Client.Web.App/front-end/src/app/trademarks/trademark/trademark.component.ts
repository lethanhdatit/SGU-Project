import { Component, OnInit } from '@angular/core';
import { TrademarkService } from 'src/app/shared/trademark.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trademark',
  templateUrl: './trademark.component.html',
  styles: []
})
export class TrademarkComponent implements OnInit {

  constructor(private trademarkService : TrademarkService, private toastr : ToastrService ) { }

  ngOnInit() {
    this.resetForm();
  }

  populateFormrs(ul){
    this.trademarkService.formData = {
      trademarkId: 0,
      trademarkName: '',
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.trademarkService.formData = {
      trademarkId: 0,
      trademarkName: '',
      status: null,
      createdDate: null,
      updatedDate: null,
    }
  }

  onSubmit(form:NgForm){
      this.insertRecord(form);
  }

  insertRecord(form:NgForm){
    this.trademarkService.post().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submmited Successfully', 'Trademark Added');
        this.trademarkService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  

}
