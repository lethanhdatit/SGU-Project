import { Component, OnInit } from '@angular/core';
import { OriginService } from 'src/app/shared/origin.service';
import { ToastrService } from 'ngx-toastr';
import { Origin } from 'src/app/shared/origin.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-origin-list',
  templateUrl: './origin-list.component.html',
  styles: []
})
export class OriginListComponent implements OnInit {
  searchText;

  constructor(private originService : OriginService, private toastr : ToastrService) { }

  ngOnInit() {
    this.originService.refreshList();
    this.resetForm();
  }

  populateForm(ul : Origin){
    this.originService.formData = Object.assign({}, ul);
  }

  onSubmit(form:NgForm){
      this.updateRecord(form);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.originService.delete(id)
      .subscribe(res => {
        this.originService.refreshList();
        this.toastr.warning('Deleted Successfully', 'Order deleted');
      },
        err => {
          console.log(err);
        })
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

  updateRecord(form:NgForm){
    this.originService.put().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submmitted Successfully', 'Origin Updated');
        this.originService.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
