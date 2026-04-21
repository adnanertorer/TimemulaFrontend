import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { EducatorDaysHoursModel } from '../model/educator-days-hours-model';

@Injectable({
  providedIn: 'root'
})
export class EducatorDaysHoursService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorDaysHours/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: EducatorDaysHoursModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/EducatorDaysHours/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: EducatorDaysHoursModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/EducatorDaysHours/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorDaysHours/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByEducator(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorDaysHours/GetByEducator/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
