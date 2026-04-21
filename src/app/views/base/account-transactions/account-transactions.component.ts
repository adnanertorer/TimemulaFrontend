import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { FilterAccountingModel } from 'src/app/shared/model/filter-accounting-model';
import { SupplierModel } from 'src/app/shared/model/supplier-model';
import { VAccountTrancation } from 'src/app/shared/model/v-account-trancation';
import { AccountTransactionWithFilterRequest } from 'src/app/shared/requests/account-transaction-with-filter-request';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { PersonTypeEnum } from 'src/environments/environment';

export interface tempCustomer {
  id: number;
  name: string;
}
@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.css'],
})
export class AccountTransactionsComponent implements OnInit {
  list: VAccountTrancation[] = [];
  tempDataList: tempCustomer[] = [];
  tempData: tempCustomer;
  filter: FilterAccountingModel;
  customers: Customer[] = [];
  supliers: SupplierModel[] = [];

  customerId: number = 0;
  customerType: number = 0;
  transactionTypeId: number = 0;
  startTime: Date = null;
  finishTime: Date = null;

  public minDate: Date = new Date(1900, 1, 1);
  public maxDate: Date = new Date(2999, 12, 31);

  displayedColumns: string[] = [
    'currentAccount',
    'transactionTypeName',
    'createdAt',
    'debt',
    'claim',
    'balance',
    'id'
  ];
  dataSource = new MatTableDataSource<VAccountTrancation>();
  @ViewChild('accountPaginator') paginator: MatPaginator;
  @ViewChild('accountSort') sort: MatSort;

  totalDebt: number = 0;
  totalClaim: number = 0;
  totalNet: number = 0;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  constructor(
    private service: AccountingTransactionService,
    private customerService: CustomerService,
    private supplierService: SupplierService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.filter = {
      customerId: 0,
      customerType: 0,
      transactionTypeId: 0,
      finishTime: null,
      startTime: null,
    };
    const request: PageRequest = {
      pageIndex: 0,
      pageSize: 10000,
      isAllItems: true,
    };
    this.service.getList(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VAccountTrancation[];
        this.list.forEach((element) => {
          this.totalDebt += element.debt;
          this.totalClaim += element.claim;
        });
        this.totalNet = this.totalDebt - this.totalClaim;
        this.dataSource.data = this.list;

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }
 
  accountAddjustment(id: number){
    this.service.addjustment(id).subscribe((data) => {
      if (data.success) {
        console.log('adjustment', data);
        this.ngOnInit();
      }
    });
  }
  startDateChange(date: any){
    this.startTime = date;
  }

  endDateChange(date: any){
    this.finishTime = date;
  }

  getCustomers() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: false,
    };
    this.customerService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<Customer>;
        this.customers = response.dynamicClass.items as Customer[];
        this.tempDataList = [];
        this.customers.forEach((element) => {
          const tempData = {
            id: element.id,
            name: element.name + ' ' + element.surname,
          };
          this.tempDataList.push(tempData);
        });
      }
    });
  }

  onChangeCustomerType(event: Event) {
    const v = +((event.target as HTMLSelectElement).value);
    this.customerType = v;
    if (this.filter) {
      this.filter.customerType = v;
    }
    if (v === PersonTypeEnum.Customer) {
      this.getCustomers();
    } else if (v === PersonTypeEnum.Supplier) {
      this.getSuppliers();
    }
  }

  getSuppliers() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 10000,
      isAllItems: true,
    };
    this.supplierService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<SupplierModel>;
        this.supliers = response.dynamicClass.items;
        this.tempDataList = [];
        this.supliers.forEach((element) => {
          const tempData = {
            id: element.id,
            name: element.companyName,
          };
          this.tempDataList.push(tempData);
        });
      }
    });
  }

  sendFilter() {
    this.totalClaim = 0;
    this.totalDebt = 0;
    this.totalNet = 0;
    const request: AccountTransactionWithFilterRequest = {
      filterAccounting: {
        customerId: this.customerId,
        customerType: this.customerType,
        transactionTypeId: this.transactionTypeId,
        startTime: this.startTime,
        finishTime: this.finishTime,
      },
      pageRequest: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isAllItems: false,
      },
    };
    this.service.getByFilter(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VAccountTrancation[];
        this.list.forEach((element) => {
          this.totalDebt += element.debt;
          this.totalClaim += element.claim;
        });
        this.totalNet = this.totalDebt - this.totalClaim;
        this.dataSource.data = this.list;

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  getList() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: false,
    };
    this.service.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VAccountTrancation[];
        this.dataSource.data = this.list;
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  openList(unicKey: string, customerId: number) {
    this.router.navigate([
      'musteri-hizmetleri/paketler-detay.html/',
      customerId.toString(),
      unicKey,
    ]);
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }
}
