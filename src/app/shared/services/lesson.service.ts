import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { LessonModel } from '../model/lesson-model';
import { LessonWithCategoriesPaginationRequest } from '../requests/lesson_with_categories_pagination_request';
import { PaginateResponse } from '../responses/paginate.response';
import { PageRequest } from '../requests/page.request';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(pageRequest: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/Lesson/List`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: LessonModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/Lesson/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: LessonModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/Lesson/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getByCategory(pageRequest: LessonWithCategoriesPaginationRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/Lesson/ListByCategory`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/Lesson/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/Lesson/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
