import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActualCustomerLessonModel } from '../model/actual-customer-lesson-model';
import { ActualForMoveModel } from '../model/actual-for-move-model';
import { BaseResponse } from '../model/BaseResponse';
import { CriteriaFilterModel } from '../model/criteria-filter-model';
import { SellPackageCriteriaModel } from '../model/sell-package-criteria-model';
import { PageRequest } from '../requests/page.request';
import { PaginateResponse } from '../responses/paginate.response';
import { VActualCustomerLessonMainModel } from '../model/v-actual-customer-lesson-main-model';
import { VPackageCountModel } from '../model/v-package-count-model';
import { VActualCustomerLessonModel } from '../model/v-actual-customer-lesson-model';
import { ActualCustomerLessonResourceModel } from '../model/actual-customer-lesson-resource-model';
import { GetListByPackageRequest } from '../requests/get-list-by-package-request';
import { PageRequestWithEducatorId } from '../requests/page-request-with-educator-id';

@Injectable({
  providedIn: 'root'
})

export class ActualCustomerLessonService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getLessonMains(request: PageRequest){
    return this.http
        .post<PaginateResponse<VActualCustomerLessonMainModel>>(`${this.apiUrl}/ActualCustomerLesson/GetLessonMains`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getTotalStudentInToday(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/GetStudentCountInToDay`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  daysBeforeEnd(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/DaysBeforeEnd`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getSaledPackageCount(request: PageRequest){
    return this.http
        .post<PaginateResponse<VPackageCountModel>>(`${this.apiUrl}/ActualCustomerLesson/SaledPackage`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCurrentLessonSummary(request: PageRequest){
    return this.http
        .post<PaginateResponse<VActualCustomerLessonModel>>(`${this.apiUrl}/ActualCustomerLesson/GetCurrentLessonSummary`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  listByFilterActualMultiTime(resource: SellPackageCriteriaModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ListByFilterMultiTime`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByFilter(resource: CriteriaFilterModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ListByFilter`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: ActualForMoveModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: ActualCustomerLessonModel){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  cancelLesson(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/CancelLesson/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  approvedLessonsByEducator(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ApprovedLessonsByEducator/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getProgramByEducator(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/EducatorLessonCost/GetProgramByEducator/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDoneLessonsByEducator(request: PageRequestWithEducatorId){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/EducatorLessonCost/GetDoneLessonsByEducator`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  setApprove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/SetApproveLesson/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByPackage(request: GetListByPackageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/ActualCustomerLesson/ListByPackage`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getActiveLessons(pageRequest: PageRequest){
    return this.http
        .post<PaginateResponse<ActualCustomerLessonResourceModel>>(`${this.apiUrl}/ActualCustomerLesson/GetActiveLessons`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getLessonsInWeek(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/LessonsInWeek`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

}
