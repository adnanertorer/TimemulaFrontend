import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { MissionModel } from '../model/mission-model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/missions`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: MissionModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/missions`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: MissionModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/missions`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/missions/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/missions/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
