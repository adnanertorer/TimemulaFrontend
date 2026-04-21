import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { FilterAccountingModel } from 'src/app/shared/model/filter-accounting-model';
import { VAccountTrancation } from 'src/app/shared/model/v-account-trancation';
import { AccountTransactionWithFilterRequest } from 'src/app/shared/requests/account-transaction-with-filter-request';
import { PageRequestWithCustomerId } from 'src/app/shared/requests/page-request-with-customer-id';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
@Component({
  selector: 'app-account-transactions-by-customer',
  templateUrl: './account-transactions-by-customer.component.html',
  styleUrls: ['./account-transactions-by-customer.component.css']
})
export class AccountTransactionsByCustomerComponent implements OnInit {
  list: VAccountTrancation[] = [];
  customer: Customer;
  selectedCustomerId: number = 0;
  totalDebt: number = 0;
  totalClaim: number = 0;
  totalNet: number = 0;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  startTime: Date = null;
  finishTime: Date = null;

  public minDate: Date = new Date(1900, 1, 1);
  public maxDate: Date = new Date(2999, 12, 31);

  filter: FilterAccountingModel;

  displayedColumns: string[] = [
    'currentAccount',
    'transactionTypeName',
    'createdAt',
    'debt',
    'claim',
    'balance',
  ];
  dataSource = new MatTableDataSource<VAccountTrancation>();
  @ViewChild('accountPaginator') paginator: MatPaginator;
  @ViewChild('accountSort') sort: MatSort;

  constructor(
    private service: AccountingTransactionService,
    private customerService: CustomerService,
    private activateRoot: ActivatedRoute,
  ) {}

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.ngOnInit();
  }

  startDateChange(date: any) {
    this.startTime = date;
  }

  endDateChange(date: any) {
    this.finishTime = date;
  }

  ngOnInit() {
    this.activateRoot.params.subscribe((params) => {
      const id = params['id'];
      this.selectedCustomerId = parseInt(id);

      this.filter = {
        customerId: this.selectedCustomerId,
        customerType: 3,
        transactionTypeId: 0,
        finishTime: null,
        startTime: null,
      };

      const request: PageRequestWithCustomerId = {
        customerId: this.selectedCustomerId,
        pageRequest: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          isAllItems: false,
        },
      };

      this.service.getListByCustomer(request).subscribe((data) => {
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
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.totalClaim = 0;
    this.totalDebt = 0;
    this.totalNet = 0;
    this.dataSource.filteredData.forEach((element) => {
      this.totalDebt += element.debt;
      this.totalClaim += element.claim;
    });
    this.totalNet = this.totalDebt - this.totalClaim;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sendFilter() {
    this.filter.customerId = parseInt(this.filter.customerId.toString());
    this.filter.customerType = parseInt(this.filter.customerType.toString());
    this.filter.transactionTypeId = parseInt(
      this.filter.transactionTypeId.toString(),
    );
    this.totalClaim = 0;
    this.totalDebt = 0;
    this.totalNet = 0;

    const request: AccountTransactionWithFilterRequest = {
      filterAccounting: {
        customerId: this.filter.customerId,
        customerType: this.filter.customerType,
        transactionTypeId: this.filter.transactionTypeId,
        startTime: this.filter.startTime,
        finishTime: this.filter.finishTime,
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
}
