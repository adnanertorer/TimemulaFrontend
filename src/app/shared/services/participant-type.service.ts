import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { PariticipantTypeModel } from '../model/pariticipant-type-model';
import { PageRequest } from '../requests/page.request';
import { PaginateResponse } from '../responses/paginate.response';

@Injectable({
  providedIn: 'root'
})
export class ParticipantTypeService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(pageRequest: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/ParticipantType/List`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: PariticipantTypeModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ParticipantType/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: PariticipantTypeModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/ParticipantType/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ParticipantType/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ParticipantType/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
