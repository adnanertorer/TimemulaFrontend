import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { ParentTypeModel } from '../model/parent-type-model';
import { QueryParamaterListModel } from '../model/query-paramater-list-model';
import { PageRequest } from '../requests/page.request';
import { PaginateResponse } from '../responses/paginate.response';

@Injectable({
  providedIn: 'root'
})
export class ParentTypeService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(request: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/ParentType/List`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getActiveList(request: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/ParentType/List`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: ParentTypeModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ParentType/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: ParentTypeModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/ParentType/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ParentType/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ParentType/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
