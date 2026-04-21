import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangePackageResourceModel } from 'src/app/shared/model/change-package-resource-model';
import { DayAndHoursModel } from 'src/app/shared/model/day-and-hours-model';
import { FilterResponseModel } from 'src/app/shared/model/filter-response-model';
import { VCustomerLessonModel } from 'src/app/shared/model/v-customer-lesson-model';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { daysEnum } from 'src/environments/environment';
import { dayOf } from '../customer-package/customer-package.component';
import { PageRequestWithCustomerIdAndUniqueKey } from 'src/app/shared/requests/actual-package-list-request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';

@Component({
  selector: 'app-change-program',
  templateUrl: './change-program.component.html',
  styleUrls: ['./change-program.component.css']
})
export class ChangeProgramComponent implements OnInit {

  daysStrArr: string[] = [];
  customerLessons: VCustomerLessonModel[] = [];
  selectedCustomerLessonId: number = 0;
  selectedBasicInfoId: number = 0;
  selectedUnicKey: string = '';
  selectedCustomerId: number = 0;
  selectedDays: DayAndHoursModel[] = [];
  changePackageResource: ChangePackageResourceModel;
  filterResponses: FilterResponseModel[] = [];
  public weekDays: daysEnum[] = [daysEnum.Pazartesi, daysEnum.Sali, daysEnum.Carsamba, daysEnum.Persembe, daysEnum.Cuma, daysEnum.Cumartesi, daysEnum.Pazar];
  public dayLabels = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  isOk: boolean = false;

  pageOfItems: Array<any>;
 
  constructor(private service: CustomerLessonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.changePackageResource = {
      currentLessonId: 0,
      customerId: 0,
      dayAndHourList: [],
      unicKey: ''
    };
    this.activatedRoute.params.subscribe(params => {
      this.selectedUnicKey = params['uniqKey'];
      this.selectedCustomerId = parseInt(params["customerId"]);
      this.changePackageResource.customerId = this.selectedCustomerId;
      this.changePackageResource.unicKey = this.selectedUnicKey;
      this.getProgramDays();
      this.getCustomerLessons();
    });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  } 

  getProgramDays(){
    this.service.getCustomerDayDetail(this.selectedUnicKey).subscribe((data)=>{
      if(data.success){
        this.daysStrArr = data.dynamicClass as string[];
      }
    })
  }

  getCustomerLessons(){
    const request: PageRequestWithCustomerIdAndUniqueKey = {
      customerId: this.selectedCustomerId,
      uniqueKey: this.selectedUnicKey,
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: true,
      }
    };
    this.service.getListByPackage(request).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<any>;
        this.customerLessons = response.dynamicClass.items as VCustomerLessonModel[];
      }
    })
  }

  dayOnChange(id) {
    const day: dayOf = {
      dayIndex: parseInt(id)
    }
    if(this.selectedDays.filter(i=>i.day == day.dayIndex).length == 0){
      const dayAndHoursVal: DayAndHoursModel = {
        day: day.dayIndex,
        dayFinishTime: '00:00',
        dayStartTime: '00:00'
      };
      this.selectedDays.push(dayAndHoursVal);
    }else{
      alert(this.dayLabels[day.dayIndex]+' zaten seçilmiş');
    }
  }

  removeDayFromList(id){
    const temp = this.selectedDays.filter(i=>i.day != parseInt(id));
    console.log(temp);
    this.selectedDays = temp;
  }

  sendForFilter(){
    this.selectedDays.forEach(element => {
      const startDateTime = (<HTMLInputElement>document.getElementById(element.day+'-firstTime')).value;
      const finisDateTime = (<HTMLInputElement>document.getElementById(element.day+'-finishTime')).value;
      element.dayFinishTime = finisDateTime;
      element.dayStartTime = startDateTime;
    });
    this.changePackageResource.dayAndHourList = this.selectedDays;
    this.changePackageResource.currentLessonId = this.selectedCustomerLessonId;
    this.service.approveChange(this.changePackageResource).subscribe((data)=>{
      if(data.success){
        this.filterResponses = data.dynamicClass as FilterResponseModel[];
        this.pageOfItems = this.filterResponses;
        var results = this.filterResponses.filter(i=>i.isClosed == true);
        if(results.length > 0){
          this.isOk = false;
        }else{
          this.isOk = true;
        }
      }
    });
  }

  approveChange(){
    console.log(this.filterResponses);
    this.service.updateChangeProgram(this.filterResponses).subscribe((data)=>{
      if(data.success){
        alert(data.clientMessage);
      }
    })
  }

}
