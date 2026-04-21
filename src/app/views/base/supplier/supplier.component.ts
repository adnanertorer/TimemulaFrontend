import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SupplierModel } from 'src/app/shared/model/supplier-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  buttonText = Constants.Save;
  supplier: SupplierModel;
  supplierList: SupplierModel[] = [];

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private service: SupplierService) {}

  ngOnInit() {
    this.supplier = {
      address: '',
      authorized: '',
      companyName: '',
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      isActive: true,
      phone: '',
    };
    this.getList();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  getDetailFromTable(resource: any): void {
    this.supplier = resource;
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
    if (this.supplier.id == 0) {
      this.service.add(this.supplier).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.supplier).subscribe(
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
      isAllItems: false,
    };

    this.service.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<any>;
      this.supplierList = response.dynamicClass.items as SupplierModel[];

      this.paginator.pageIndex = this.pageIndex;
      this.paginator.length = this.total;
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
