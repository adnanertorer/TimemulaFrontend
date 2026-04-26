import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Roles } from './roles.model';
import { BaseResponse } from 'src/app/shared/model/BaseResponse';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class RolesService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  add(resource: Roles) {
    return this.http
      .post<BaseResponse>(`${this.apiUrl}/User/AddRole`, resource)
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

   update(resource: Roles) {
    return this.http
      .put<BaseResponse>(`${this.apiUrl}/User/Roles`, resource)
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

  getList() {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/User/Roles`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }
}
