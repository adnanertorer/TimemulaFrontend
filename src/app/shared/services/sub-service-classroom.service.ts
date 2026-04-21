import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { SubServiceClassroom } from '../model/sub-service-classroom';

@Injectable({
  providedIn: 'root'
})
export class SubServiceClassroomService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/get-sub-service-classrooms/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: SubServiceClassroom){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/sub-service-classrooms`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: SubServiceClassroom){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/sub-service-classrooms`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/sub-service-classrooms/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/sub-service-classrooms/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
