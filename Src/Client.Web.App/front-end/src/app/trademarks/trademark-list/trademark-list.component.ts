import { Component, OnInit } from '@angular/core';
import { TrademarkService } from 'src/app/shared/trademark.service';
import { ToastrService } from 'ngx-toastr';
import { Trademark } from 'src/app/shared/trademark.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trademark-list',
  templateUrl: './trademark-list.component.html',
  styles: []
})
export class TrademarkListComponent implements OnInit {
  searchText;

  constructor(private trademarkService : TrademarkService, private toastr : ToastrService) { }

  ngOnInit() {
    this.trademarkService.refreshList();
    this.resetForm();
  }

  populateForm(ul : Trademark){
    this.trademarkService.formData = Object.assign({}, ul);
  }

  onSubmit(form:NgForm){
    this.updateRecord(form);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.trademarkService.delete(id)
      .subscribe(res => {
        this.trademarkService.refreshList();
        this.toastr.warning('Deleted Successfully', 'Trademark deleted');
      },
        err => {
          console.log(err);
        })
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.trademarkService.formData = {
      trademarkId: 0,
      trademarkName: '',
      status: 0,
      createdDate: null,
      updatedDate: null,
    }
  }

  updateRecord(form:NgForm){
    this.trademarkService.put().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submmited Successfully', 'Trademark Updated');
        this.trademarkService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
