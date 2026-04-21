import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { DeptCollectionFilterModel } from '../model/dept-collection-filter-model';
import { DeptCollectionModel } from '../model/dept-collection-model';
import { InstallmentDeptCollectionModel } from '../model/installment-dept-collection-model';
import { PageRequest } from '../requests/page.request';
import { VDeptCollectionModel } from '../model/v-dept-collection-model';
import { PaginateResponse } from '../responses/paginate.response';
import { PageRequestWithDebtCollectionFilter } from '../requests/page-request-with-debtcollection-filter';

@Injectable({
  providedIn: 'root'
})
export class DeptCollectionService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(request: PageRequest){
    return this.http
        .post<PaginateResponse<VDeptCollectionModel>>(`${this.apiUrl}/DeptCollection/List`, request)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByFilter(request: PageRequestWithDebtCollectionFilter){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/DeptCollection/GetByFilter`, request)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addInstallment(resource: InstallmentDeptCollectionModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/DeptCollection/AddInstallmentDetail`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: DeptCollectionModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/DeptCollection/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: DeptCollectionModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/DeptCollection/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/DeptCollection/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/DeptCollection/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
