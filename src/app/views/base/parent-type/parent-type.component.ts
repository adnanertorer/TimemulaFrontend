import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ParentTypeModel } from 'src/app/shared/model/parent-type-model';
import { QueryParamaterListModel } from 'src/app/shared/model/query-paramater-list-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ParentTypeService } from 'src/app/shared/services/parent-type.service';
declare let alertify: any;

@Component({
  selector: 'app-parent-type',
  templateUrl: './parent-type.component.html',
  styleUrls: ['./parent-type.component.css']
})
export class ParentTypeComponent implements OnInit {

  parentType: ParentTypeModel;
  list: ParentTypeModel[] = [];
  form: UntypedFormGroup;
  pageOfItems: Array<any>;
  buttonText = 'Kaydet';
  queryParameter: QueryParamaterListModel;
  constructor(private service: ParentTypeService) { }

  ngOnInit() {
    this.queryParameter = {
      limit: 50,
      offset: 0,
      sortBy: 'asc'
    };
    this.parentType = {
      createdBy: 0,
      id: 0,
      isActive: true,
      parentTypeName: ''
    };

    this.form = new UntypedFormGroup({
      'parent_type_name': new UntypedFormControl(this.parentType.parentTypeName, Validators.required)
    });

    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.parentType = resource;
    this.buttonText = 'Güncelle';
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = 'Kaydet';
    this.ngOnInit();
  }

  add(): void {
    if (this.parentType.id == 0) {
      this.service.add(this.parentType).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.parentType).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  getList(): void {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 50,
      isAllItems: false
    };
    this.service.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<ParentTypeModel>;
      this.list = response.dynamicClass.items;
      this.pageOfItems = this.list;
    })
  }

  remove(id: number): void {
    const approve = confirm('Ebeveyn türü silmek üzeresiniz, devam etmek istiyor musunuz?');
    if(approve){
      this.service.remove(id).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        } else {
          alert(data.clientMessage);
        }
      });
    }
  }

}
