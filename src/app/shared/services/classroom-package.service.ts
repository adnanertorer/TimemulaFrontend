import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { PackageClassroomModel } from '../model/package-classroom-model';
import { CreateClassroomForLesson } from 'src/app/views/base/create-classroom/create-classroom.component';
import { PageRequest } from '../requests/page.request';
import { PaginateResponse } from '../responses/paginate.response';

@Injectable({
  providedIn: 'root'
})
export class PackageClassroomService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(pageRequest: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/PackageClassroom/List`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: PackageClassroomModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/PackageClassroom/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addSetup(resource: CreateClassroomForLesson){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/PackageClassroom/AddSetup`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: PackageClassroomModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/PackageClassroom/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/PackageClassroom/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/PackageClassroom/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
