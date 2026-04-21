import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { CustomerLessonSchedule } from '../model/customer-lesson-schedule';

@Injectable({
  providedIn: 'root'
})
export class CustomerLessonsScheduleService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/lesson-schedule`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }


  add(resource: CustomerLessonSchedule){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/lesson-schedule`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: CustomerLessonSchedule){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/lesson-schedule`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/lesson-schedule/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/lesson-schedule/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
