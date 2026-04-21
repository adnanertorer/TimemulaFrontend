import { Component, OnInit, ViewChild } from '@angular/core';
import { CashboxFilterModel } from 'src/app/shared/model/cashbox-filter-model';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { CashboxTransactionTypeModel } from 'src/app/shared/model/cashbox-transaction-type-model';
import { VCashboxTransactionModel } from 'src/app/shared/model/v-cashbox-transaction-model';
import { PageRequestWithCashboxFilter } from 'src/app/shared/requests/page-request-with-cashbox-filter';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CashBoxTransactionService } from 'src/app/shared/services/cash-box-transaction.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';

@Component({
  selector: 'app-cashbox-transaction',
  templateUrl: './cashbox-transaction.component.html',
  styleUrls: ['./cashbox-transaction.component.css']
})
export class CashboxTransactionComponent implements OnInit {

  list: VCashboxTransactionModel[] = [];
  pageOfItems: Array<any>;
  totalExpense: number = 0;
  totalIncome: number = 0;
  net: number = 0;
  filter: CashboxFilterModel;
  transactionTypes: CashboxTransactionTypeModel[] = [];
  cashBoxes: CashboxModel[] = [];
  cashBoxId: number = 0;
  transactionTypeId: number = 0;
  
  public dateValue?: Date = null;
  public endDateValue?: Date = null;
  public minDate: Date = new Date(1900, 1 , 1);
  public maxDate: Date = new Date(2999, 12, 31);

  constructor(private service: CashBoxTransactionService, private cashBoxService: CashboxService) { }

  ngOnInit() {
    this.filter = {
      cashBoxId: 0,
      transactionTypeId: 0,
      finishDate: null,
      startDate: null
    };
    this.getTransactionTypes();
    this.getCashBoxes();
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  startDateChange(date: any){
    console.log(date);
    this.dateValue = date;
  }

  endDateChange(date: any){
    console.log(date);
    this.endDateValue = date;
  }

  getWithFilter(){
    this.totalExpense = 0;
    this.totalIncome = 0;
    const request: PageRequestWithCashboxFilter = {
      cashBoxFilter: {
        cashBoxId: this.cashBoxId,
        transactionTypeId: this.transactionTypeId,
        startDate: this.dateValue,
        finishDate: this.endDateValue
      },
      pageRequest: {
        pageIndex: 0,
        pageSize: 100000,
        isAllItems: true
      }
    };
    this.service.getByFilter(request).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VCashboxTransactionModel[];
        this.list.forEach(element => { 
          if(element.transactionTypeId == 1){
            this.totalIncome = this.totalIncome+element.cost;
          }else{
            this.totalExpense = this.totalExpense+element.cost;
          }
        });
        this.net = this.totalIncome - this.totalExpense;
        this.pageOfItems = this.list;
      }
    })
  }

  getTransactionTypes(){
    this.service.getTransactionTypes().subscribe((data)=>{
      if(data.success){
        this.transactionTypes = data.dynamicClass as CashboxTransactionTypeModel[];
      }
    })
  }

  getCashBoxes(){
    this.cashBoxService.getList().subscribe((data)=>{
      if(data.success){
        this.cashBoxes = data.dynamicClass as CashboxModel[];
      }
    })
  }
  getByFilter(){
    const request: PageRequestWithCashboxFilter = {
      cashBoxFilter: {
        cashBoxId: this.cashBoxId,
        transactionTypeId: this.transactionTypeId,
        startDate: this.dateValue,
        finishDate: this.endDateValue
      },
      pageRequest: {
        pageIndex: 0,
        pageSize: 100000,
        isAllItems: true
      }
    };
    this.service.getByFilter(request).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VCashboxTransactionModel[];
        this.list.forEach(element => {
          if(element.transactionTypeId == 1){
            this.totalIncome = this.totalIncome+element.cost;
          }else{
            this.totalExpense = this.totalExpense+element.cost;
          }
        });
        this.net = this.totalIncome - this.totalExpense;
        this.pageOfItems = this.list;
      }
    });
  }

  getList(){
    const request: PageRequest = {
      pageIndex: 0,
      pageSize: 100000,
      isAllItems: true
    }
    this.service.getList(request).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VCashboxTransactionModel[];
        this.list.forEach(element => {
          if(element.transactionTypeId == 1){
            this.totalIncome = this.totalIncome+element.cost;
          }else{
            this.totalExpense = this.totalExpense+element.cost;
          }
        });
        this.net = this.totalIncome - this.totalExpense;
        this.pageOfItems = this.list;
      }
    });
  }

}
