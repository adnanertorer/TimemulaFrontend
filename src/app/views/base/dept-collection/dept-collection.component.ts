import { Component, OnInit, ViewChild } from '@angular/core';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { DeptCollectionModel } from 'src/app/shared/model/dept-collection-model';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { DeptCollectionService } from 'src/app/shared/services/dept-collection.service';
declare let alertify: any;
import { MatDialog } from '@angular/material/dialog';
import { CollectionSubComponent } from '../collection-sub/collection-sub.component';
import { DeptCollectionDialogData } from 'src/app/shared/model/dept-collection-dialog-data';
import { VCurrentBalanceModel } from 'src/app/shared/model/v-current-balance-model';
import { VDeptCollectionModel } from 'src/app/shared/model/v-dept-collection-model';
import { Router } from '@angular/router';
import { DeptCollectionFilterModel } from 'src/app/shared/model/dept-collection-filter-model';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { VGeneralCustomerBalanceModel } from 'src/app/shared/model/v-general-customer-balance-model';
import { VCurrentLastBalanceModel } from 'src/app/shared/model/v-current-last-balance-model';
import Constants from 'src/app/shared/tools/constants';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PageEvent } from '@angular/material/paginator';
import { PageRequestWithDebtCollectionFilter } from 'src/app/shared/requests/page-request-with-debtcollection-filter';

@Component({
  selector: 'app-dept-collection',
  templateUrl: './dept-collection.component.html',
  styleUrls: ['./dept-collection.component.css'],
})
export class DeptCollectionComponent implements OnInit {
  transactionList: VCurrentBalanceModel[] = [];
  transactionGeneralList: VCurrentLastBalanceModel[] = [];
  generalDebts: VGeneralCustomerBalanceModel[] = [];

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  startDate: Date = null;
  endDate: Date = null;

  public minDate: Date = new Date(1900, 1, 1);
  public maxDate: Date = new Date(2999, 12, 31);

  cashBoxId: number = 0;
  customerId: number = 0;

  deptCollection: DeptCollectionModel = {
    // accountingTransactionId: 0,
    collectionAmount: 0,
    createdAt: new Date(),
    createdBy: 0,
    id: 0,
    cashBoxId: 0,
    description: '',
    customerId: 0,
  };

  deptCollectionList: VDeptCollectionModel[] = [];
  cashBoxList: CashboxModel[] = [];
  cashBoxes: CashboxModel[] = [];
  customers: Customer[] = [];
  buttonText = Constants.Save;
  pageOfItemTransactions: Array<any>;
  isCollection: boolean = false;
  strcurrentAccount: string = '';
  strDept: number = 0;
  totalCollection: number = 0;
  modalData: DeptCollectionDialogData;
  filter: DeptCollectionFilterModel;

  constructor(
    private accontingService: AccountingTransactionService,
    private service: DeptCollectionService,
    private cashBoxService: CashboxService,
    public dialog: MatDialog,
    private router: Router,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.modalData = {
      cashBoxList: [],
      currentAccount: '',
      deptCollection: this.deptCollection,
      strDept: 0,
    };
    this.filter = {
      cashBoxId: 0,
      customerId: 0,
      endDate: null,
      startDate: null,
    };

    this.getAccountsGeneral();
    this.getCustomerDepts();
    this.getCashBoxesForFilter();
    this.getCustomers();
    this.getList();
  }

  startDateChange(date: any) {
    this.startDate = date;
  }

  endDateChange(date: any) {
    this.endDate = date;
  }

  openDialog(): void {
    this.modalData = {
      cashBoxList: this.cashBoxList,
      currentAccount: this.strcurrentAccount,
      deptCollection: this.deptCollection,
      strDept: this.strDept,
    };
    const dialogRef = this.dialog.open(CollectionSubComponent, {
      width: '600px',
      data: {
        cashBoxList: this.cashBoxList,
        currentAccount: this.strcurrentAccount,
        deptCollection: this.deptCollection,
        strDept: this.strDept,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getCashBoxesForFilter() {
    this.cashBoxService.getList().subscribe((data) => {
      if (data.success) {
        this.cashBoxes = data.dynamicClass as CashboxModel[];
      }
    });
  }

  getWithFilter() {
    const request: PageRequestWithDebtCollectionFilter = {
      pageRequest: {
        pageIndex: 0,
        pageSize: 10000,
        isAllItems: true,
      },
      filter: {
        cashBoxId: this.cashBoxId,
        customerId: this.customerId,
        startDate: this.startDate,
        endDate: this.endDate,
      },
    };

    this.service.getByFilter(request).subscribe((data) => {
      const response = data as PaginateResponse<any>;
      this.deptCollectionList = response.dynamicClass
        .items as VDeptCollectionModel[];
      this.totalCollection = 0;
      this.deptCollectionList.forEach((element) => {
        this.totalCollection = element.collectionAmount + this.totalCollection;
      });
    });
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
      }
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  getDetailFromTable(resource: any): void {
    this.deptCollection = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  /* getInstallment(resource: any): void{
    this.router.navigate(['finansal-islemler/odeme-planlama.html/', resource.customerId, resource.relatingId]);
  }*/

  getInstallment(resource: any): void {
    this.router.navigate([
      'finansal-islemler/odeme-planlama.html/',
      resource.customerId,
    ]);
  }

  getCollection(resource: any): void {
    this.deptCollection.customerId = resource.customerId;
    this.strcurrentAccount = resource.name + ' ' + resource.surname;
    this.strDept = resource.cashDebt;
    this.isCollection = true;
    this.openDialog();
  }

  getDetailTransaction(resource: any): void {}

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.deptCollection.id == 0) {
      this.service.add(this.deptCollection).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.deptCollection).subscribe(
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
      const response = data as PaginateResponse<VDeptCollectionModel>;
      this.deptCollectionList = response.dynamicClass
        .items as VDeptCollectionModel[];
      this.total = response.dynamicClass.count;
      this.pageIndex = response.dynamicClass.index;
      this.deptCollectionList.forEach((element) => {
        this.totalCollection = element.collectionAmount + this.totalCollection;
      });
    });
  }

  getAccountsGeneral() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 10000,
      isAllItems: true,
    };
    this.accontingService.getCurrentBalance(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.transactionGeneralList = response.dynamicClass
          .items as VCurrentLastBalanceModel[];
      }
    });
  }

  getCustomerDepts() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 10000,
      isAllItems: true,
    };
    this.accontingService.getCustomerDepts(pageRequest).subscribe((data) => {
      if (data.success) {
        console.log('getCustomerDepts', data);
        const response = data as PaginateResponse<any>;
        this.generalDebts = response.dynamicClass
          .items as VGeneralCustomerBalanceModel[];
        console.table(this.generalDebts);
      }
    });
  }

  getAccounts() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 100000,
      isAllItems: true,
    };
    this.accontingService.getCutomerDepts(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.transactionList = response.dynamicClass
          .items as VCurrentBalanceModel[];
      }
    });
  }

  openInstallmentDetailList(id: number) {
    this.router.navigate(['cari-hesaplar/musteri-taksit-listesi.html/', id]);
  }

  openInstallmentItems() {
    //vadeli-alacak-tahsilati.html
    this.router.navigate(['cari-hesaplar/vadeli-alacak-tahsilati.html/']);
  }

  getCashBoxes() {
    this.cashBoxService.getList().subscribe((data) => {
      if (data.success) {
        this.cashBoxList = data.dynamicClass as CashboxModel[];
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
