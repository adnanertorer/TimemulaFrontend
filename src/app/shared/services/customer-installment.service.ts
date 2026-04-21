import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { CustomerInstallmentModel } from '../model/customer-installment-model';
import { InstallmentResultModel } from '../model/installment-result-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerInstallmentService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/InstallmentMain/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getSubList(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/InstallmentSub/ListByMain/?mainId=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: CustomerInstallmentModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerInstallment/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addManuel(resource: CustomerInstallmentModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerInstallment/AddManuel`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: CustomerInstallmentModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/CustomerInstallment/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByCustomer(customerId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerInstallment/ListByCustomer/?customerId=${customerId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerInstallment/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/CustomerInstallment/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addSub(resource: InstallmentResultModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/InstallmentMain/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
