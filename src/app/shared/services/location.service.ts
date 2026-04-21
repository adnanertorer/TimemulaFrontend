import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getCities(){
    return this.http
      .post<BaseResponse>(`${this.apiUrl}Location/GetCityList`, null)
      .pipe(
          map((x)=> {
              return x;
          })
      );
  }

  getDitricts(cityId: number){
    return this.http
      .post<BaseResponse>(`${this.apiUrl}Location/GetDistrictList/?cityId=${cityId.toString()}`, null)
      .pipe(
          map((x)=> {
              return x;
          })
      );
  }

  getAreas(districtId: number){
    return this.http
      .post<BaseResponse>(`${this.apiUrl}Location/GetAreaList/?districtId=${districtId.toString()}`, null)
      .pipe(
          map((x)=> {
              return x;
          })
      );
  }

  getStreets(areaId: number){
    return this.http
      .post<BaseResponse>(`${this.apiUrl}Location/GetStreetList/?areaId=${areaId.toString()}`, null)
      .pipe(
          map((x)=> {
              return x;
          })
      );
  }



}
