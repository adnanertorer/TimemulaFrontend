import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/BaseResponse';
import { CustomerLesson } from '../model/customer-lesson';
import { CriteriaFilterModel } from '../model/criteria-filter-model';
import { SellPackageCriteriaModel } from '../model/sell-package-criteria-model';
import { ChangePackageResourceModel } from '../model/change-package-resource-model';
import { MoveLessonModel } from '../model/move-lesson-model';
import { LessonMoveRequestModel } from '../model/lesson-move-request-model';
import { FilterResponseModel } from '../model/filter-response-model';
import { PageRequest } from '../requests/page.request';
import { PaginateResponse } from '../responses/paginate.response';
import { PageRequestWithCustomerId } from '../requests/page-request-with-customer-id';
import { TempToActualRequest } from '../requests/temp-to-actual-request';
import { PageRequestWithCustomerIdAndUniqueKey } from '../requests/actual-package-list-request';

@Injectable({
  providedIn: 'root'
})
export class CustomerLessonService {

  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getList(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerLesson/List`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByCustomer(pageRequest: PageRequestWithCustomerId){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/CustomerLesson/ListByCustomer/`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  submitMove(resource: LessonMoveRequestModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/MoveApprove`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListActualByPackage(request: PageRequestWithCustomerIdAndUniqueKey){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/ActualCustomerLesson/ListByPackage`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  moveLesson(resource: MoveLessonModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/MoveLesson`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getTempList(pageRequest: PageRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/CustomerLesson/ListByCustomerTemp`, pageRequest, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }
""
  tempToActual(request: TempToActualRequest){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/CustomerLesson/TempToActual`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByPackage(request: PageRequestWithCustomerIdAndUniqueKey){
    return this.http
        .post<PaginateResponse<any>>(`${this.apiUrl}/CustomerLesson/ListByPackage`, request, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getListByFilter(resource: CriteriaFilterModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/ListByFilter`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  approveChange(resource: ChangePackageResourceModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/ApproveChange`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  updateChangeProgram(resource: FilterResponseModel[]){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/UpdateChangeProgram`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  listByFilterMultiTime(resource: SellPackageCriteriaModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/ListByFilterMultiTime`, resource)
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

  listByFilterActualMultiTimeForAdd(resource: SellPackageCriteriaModel){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/ActualCustomerLesson/ListByFilterMultiTimeForAdd`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  add(resource: CustomerLesson){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/Add`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  addRange(resource: CustomerLesson[]){
    return this.http
        .post<BaseResponse>(`${this.apiUrl}/CustomerLesson/AddRange`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  update(resource: CustomerLesson){
    return this.http
        .put<BaseResponse>(`${this.apiUrl}/CustomerLesson/Update`, resource)
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getDetails(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerLesson/Detail/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  listCustomerDayNames(id: number){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerLesson/ListCustomerDayNames/?basicInfoId=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCustomerDayDetail(unicKey: string){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerLesson/GetCustomerDayDetail/?unicKey=${unicKey}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  remove(id: number){
    return this.http
    .delete<BaseResponse>(`${this.apiUrl}/CustomerLesson/Remove/?id=${id.toString()}`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getCustomerLessonTotal(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerLesson/TotalCustomerLesson`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }

  getTotalCustomerPackages(){
    return this.http
        .get<BaseResponse>(`${this.apiUrl}/CustomerLesson/TotalCustomerPackages`, {observe: 'body'})
        .pipe(
            map((x)=> {
                return x;
            })
        );
  }


}
