import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { LessonEducatorModel } from '../model/lesson-educator-model';
import { CustomerLesson } from '../model/customer-lesson';
import { PageRequest } from '../requests/page.request';
import { PaginateResponse } from '../responses/paginate.response';
import { PageRequestLessonById } from '../requests/page_request_lesson_by_id';

@Injectable({
  providedIn: 'root'
})
export class LessonEducatorService {

  private readonly apiUrl = `${environment.apiUrl}`;
  public selectedTeacherStudents:  any[];
  public selectedCustomerLessons: CustomerLesson[];
  public selectedCustomerId: number;
  public selectedLessonImage: string;

  constructor(private http: HttpClient) { }

  getList(pageRequest: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/LessonEducator/List`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: LessonEducatorModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/LessonEducator/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }


  update(resource: LessonEducatorModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/LessonEducator/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getSeassions(unicStrId: string){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/GetEducatorPackageSessions/?unicStrId=${unicStrId}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/LessonEducator/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getEducatorLesson(educatorId: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/LessonEducator/GetEducatorLessons/?educatorId=${educatorId.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getLessonList(pageRequest: PageRequestLessonById){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/LessonEducator/ListByLesson`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
