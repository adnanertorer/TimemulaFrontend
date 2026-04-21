import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountTransactionTempModel } from '../model/account-transaction-temp-model';
import { AccountingTransactionModel } from '../model/accounting-transaction-model';
import { BaseResponse } from '../model/BaseResponse';
import { FilterAccountingModel } from '../model/filter-accounting-model';
import { PageRequestWithCustomerId } from '../requests/page-request-with-customer-id';
import { PaginateResponse } from '../responses/paginate.response';
import { AccountTransactionWithFilterRequest } from '../requests/account-transaction-with-filter-request';
import { PageRequest } from '../requests/page.request';

@Injectable({
  providedIn: 'root'
})
export class AccountingTransactionService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(request: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/AccountingTransaction/List`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByCustomer(request: PageRequestWithCustomerId){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/AccountingTransaction/ListByCustomer/`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getSales(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetSales`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addjustment(id: number){
     return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/AdjustmentAccount/?id=${id}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCutomerDepts(request: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/AccountingTransaction/GetCustomerDepts`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCurrentBalance(request: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/AccountingTransaction/GetCurrentDepts`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCustomerDepts(request: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/AccountingTransaction/GetCustomerDepts`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCutomerDeptGeneral(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetGeneralCustomerBalance`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getMyDepts(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetMyDepts`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCustomerDeptDetail(customerId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetCustomerDeptDetail/?customerId=${customerId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: AccountingTransactionModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/AccountingTransaction/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addTemp(resource: AccountTransactionTempModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/AccountingTransaction/AddTemp`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByFilter(request: AccountTransactionWithFilterRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/AccountingTransaction/GetByFilter`, request)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: AccountingTransactionModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/AccountingTransaction/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}Clasroom/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}Clasroom/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getAccountStatus(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/AccountingTransaction/GetAccountsStatus`)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
