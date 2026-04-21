import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { CustomerDayModel } from '../model/customer-day-model';
import { CustomerLessonsTemp } from '../model/customer-lessons-temp';

@Injectable()
export class CustomerLessonsTempService {

    private readonly apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }
  
    getList(){
      return this.http
          .get<BaseResponse>(`${this.apiUrl}/CustomerLessonTemp/List`, {observe: 'body'})
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }
  
    add(resource: CustomerLessonsTemp){
      return this.http
          .post<BaseResponse>(`${this.apiUrl}/CustomerLessonTemp/Add`, resource)
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }
  
    addRange(resource: CustomerLessonsTemp[]){
      return this.http
          .post<BaseResponse>(`${this.apiUrl}/CustomerLessonTemp/AddRange`, resource)
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }

    addCustomerDay(resource: CustomerDayModel){
        return this.http
            .post<BaseResponse>(`${this.apiUrl}/CustomerLessonTemp/AddCustomerDay`, resource)
            .pipe(
                map((x)=> {
                    return x;
                })
            );
      }
  
    remove(id: number){
      return this.http
      .delete<BaseResponse>(`${this.apiUrl}/CustomerLessonTemp/Remove/?id=${id.toString()}`, {observe: 'body'})
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }

}
