import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { CustomerHealthModel } from '../model/customer-health-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerHealthService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  getList(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerHealth/List/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: CustomerHealthModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerHealth/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: CustomerHealthModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/CustomerHealth/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerHealth/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/CustomerHealth/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
    );
  }

}
