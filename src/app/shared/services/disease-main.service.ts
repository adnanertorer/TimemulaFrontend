import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { DiseaseMainModel } from '../model/disease-main-model';
import { DiseaseSubModel } from '../model/disease-sub-model';

@Injectable({
  providedIn: 'root'
})
export class DiseaseMainService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/DiseaseMain/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListSub(mainId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/DiseaseMain/ListSub/?mainId=${mainId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: DiseaseMainModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/DiseaseMain/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addSub(resource: DiseaseSubModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/DiseaseMain/AddSub`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: DiseaseMainModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/DiseaseMain/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  updateSub(resource: DiseaseSubModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/DiseaseMain/UpdateSub`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/DiseaseMain/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetailSub(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/DiseaseMain/DetailSub/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/DiseaseMain/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
    );
  }

  removeSub(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/DiseaseMain/RemoveSub/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
    );
  }

}
