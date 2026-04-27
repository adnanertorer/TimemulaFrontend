import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyUsersCreateRequest } from '../request-objects/company-users-create-request';
import { BaseResponse } from 'src/app/shared/model/BaseResponse';
import { map } from 'rxjs/operators';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CompanyUsersModel } from '../models/company-users-model';

@Injectable({
  providedIn: 'root',
})
export class CompanyUsersService {
  
  private readonly apiUrl = `${environment.apiUrl}`;
  
  constructor(private http: HttpClient) {}

  add(resource: CompanyUsersModel){
      return this.http
          .post<BaseResponse>(`${this.apiUrl}/User/AddCompanyUser`, resource)
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }

     update(resource: CompanyUsersModel){
      return this.http
          .put<BaseResponse>(`${this.apiUrl}/User/UpdateCompanyUser`, resource)
          .pipe(
              map((x)=> {
                  return x;
              })
          );
    }

     getList(pageRequest: PageRequest){
        return this.http
            .post<PaginateResponse<any>>(`${this.apiUrl}/User/CompanyUsers`, pageRequest, {observe: 'body'})
            .pipe(
                map((x)=> {
                    return x;
                })
            );
      }
}
