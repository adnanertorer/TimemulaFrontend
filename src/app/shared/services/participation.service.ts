import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { ParticipationModel } from '../model/participation-model';
import { QueryParamaterListModel } from '../model/query-paramater-list-model';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(parameter: QueryParamaterListModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/get-participation-statuses/`, parameter)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getActiveList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/active-participation-statuses`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: ParticipationModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/participation-statuses`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: ParticipationModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/participation-statuses`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/participation-statuses/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/participation-statuses/${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
