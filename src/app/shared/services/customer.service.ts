import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { Customer } from '../model/customer';
import { CustomerFilter } from '../model/customer-filter';
import { PageRequest } from '../requests/page.request';
import { PaginateResponse } from '../responses/paginate.response';

@Injectable()
export class CustomerService {

    private readonly apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }
  
    getList(request: PageRequest){
      return this.http
          .post<PaginateResponse<Customer>>(`${this.apiUrl}/Customer/List`, request, {observe: 'body'})
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }

    getListWithFilter(filter: CustomerFilter){
        return this.http.post<BaseResponse>(`${this.apiUrl}/Customer/GetByFilter/`, filter)
            .pipe(
                map((x)=> {
                    return x;
                })
            );
      }
  
    add(resource: Customer){
      return this.http
          .post<BaseResponse>(`${this.apiUrl}/Customer/Add`, resource)
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }
  
    update(resource: Customer){
      return this.http
          .put<BaseResponse>(`${this.apiUrl}/Customer/Update`, resource)
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }
  
    getDetails(id: number){
      return this.http
          .get<BaseResponse>(`${this.apiUrl}/Customer/Detail/?id=${id.toString()}`, {observe: 'body'})
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }
  
    remove(id: number){
      return this.http
      .delete<BaseResponse>(`${this.apiUrl}/Customer/Remove/?id=${id.toString()}`, {observe: 'body'})
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }

    genders(){
        return this.http
            .get<BaseResponse>(`${this.apiUrl}/Customer/Genders`, {observe: 'body'})
            .pipe(
                map((x)=> {
                    return x;
                })
            );
      }

      getBirthdayInWeek(){
        return this.http
            .get<BaseResponse>(`${this.apiUrl}/Customer/BirthDayInWeek`, {observe: 'body'})
            .pipe(
                map((x)=> {
                    return x;
                })
            );
      }
}
