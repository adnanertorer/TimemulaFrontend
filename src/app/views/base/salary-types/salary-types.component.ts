import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaryType } from '../../../shared/model/salary-type';
import { SalaryTypeService } from '../../../shared/services/salary-type.service';
import Constants from 'src/app/shared/tools/constants';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
declare let alertify: any;

@Component({
  selector: 'app-salary-types',
  templateUrl: './salary-types.component.html',
  styleUrls: ['./salary-types.component.scss'],
})
export class SalaryTypesComponent implements OnInit {
  salaryType: SalaryType | undefined;
  salaryTypes: SalaryType[] = [];
  pageOfItems: Array<any> | undefined;
  buttonText = Constants.Save;

  @ViewChild('salaryTypePagination') paginator: MatPaginator | undefined;

  constructor(private service: SalaryTypeService) {}

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  ngOnInit() {
    this.salaryType = {
      created_by: 0,
      id: 0,
      salaryTypeName: '',
    };
    this.getList();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.salaryType = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.salaryType!.id == 0) {
      this.service.add(this.salaryType!).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.salaryType!).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    }
  }

  getList(): void {
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: true,
    };
    this.service.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<SalaryType>;
      this.salaryTypes = response.dynamicClass.items;
      this.pageOfItems = this.salaryTypes;
      this.total = response.dynamicClass.count;
      this.pageIndex = response.dynamicClass.index;

      if (this.paginator) {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  remove(id: number): void {
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
