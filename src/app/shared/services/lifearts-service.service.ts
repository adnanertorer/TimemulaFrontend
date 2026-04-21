import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { LifeartsService } from '../model/lifearts-service';

@Injectable({
  providedIn: 'root'
})
export class LifeartsArtServiceService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ArtService/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: LifeartsService){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ArtService/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: LifeartsService){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/ArtService/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ArtService/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ArtService/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
