import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { SubServiceTeacherModel } from '../model/sub-service-teacher-model';

@Injectable({
  providedIn: 'root'
})
export class SubServiceTeacherService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/get-sub-service-teachers/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: SubServiceTeacherModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/sub-service-teachers`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: SubServiceTeacherModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/sub-service-teachers`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/sub-service-teachers/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/sub-service-teachers/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
