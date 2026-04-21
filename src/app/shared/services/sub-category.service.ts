import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { SubCategoryModel } from '../model/sub-category-model';
import { SubCategoryWithCategoryIdPaginationRequest } from '../requests/subcategory_with_categoryid_pagination';
import { PaginateResponse } from '../responses/paginate.response';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(pageRequest: SubCategoryWithCategoryIdPaginationRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/SubCategory/List`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListAll(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/SubCategory/ListAll`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }


  add(resource: SubCategoryModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/SubCategory/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: SubCategoryModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/SubCategory/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/SubCategory/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/SubCategory/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
