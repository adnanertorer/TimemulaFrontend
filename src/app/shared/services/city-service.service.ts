import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList() {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/City/List`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  getDistricts(cityId: number) {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/City/Districts/?cityId=${cityId.toString()}`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        })
      );
  }
}
