import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventRenderedArgs, EventSettingsModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { Customer } from 'src/app/shared/model/customer';
import { VActualCustomerLessonModel } from 'src/app/shared/model/v-actual-customer-lesson-model';
import { GetListByPackageRequest } from 'src/app/shared/requests/get-list-by-package-request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-student-lesson-schedule',
  templateUrl: './student-lesson-schedule.component.html',
  styleUrls: ['./student-lesson-schedule.component.css']
})
export class StudentLessonScheduleComponent implements OnInit {

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  list: VActualCustomerLessonModel[] = [];
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel;
  public customerName: string;
  selectedCustomerId: number = 0;
  selectedUnicKey: string = '';
  constructor(private service: ActualCustomerLessonService, private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.selectedCustomerId = params["customerId"];
      this.selectedUnicKey = params["unicKey"];
    });
  }

  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.categoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  ngAfterViewInit() {
    this.customerService.getDetails(this.selectedCustomerId).subscribe((data) => {
      if (data.success) {
        let customer = data.dynamicClass as Customer;
        this.customerName = customer.name + ' ' + customer.surname;
        const request: GetListByPackageRequest = {
          customerId: this.selectedCustomerId,
          unicStr: this.selectedUnicKey,
          pageRequest: {
            pageIndex: 0,
            pageSize: 1000,
            isAllItems: true,
          }
        }
        this.service.getListByPackage(request).subscribe((data) => {
          if (data.success) {
            const response = data as PaginateResponse<any>;
            this.list = response.dynamicClass.items as VActualCustomerLessonModel[];
            this.list.forEach(element => {
              if (element.isMoved) {
                element.categoryColor = 'Orange';
                element.artPackageName = element.artPackageName + ' (Başka bir tarihe taşınmış)';
              }
            });
            const lastElementIndex = this.list.indexOf(this.list[this.list.length - 1]);
            const lastElement = this.list[lastElementIndex];
            lastElement.categoryColor = 'Yellow';
            lastElement.artPackageName = lastElement.artPackageName + ' (Paketin son dersi)';
            this.eventSettings = {
              dataSource: this.list,
              fields: {
                id: 'id',
                subject: { name: 'artPackageName' },
                startTime: { name: 'startDate' },
                endTime: { name: 'finishDate' },
              },
              allowAdding: false,
              allowDeleting: false,
              allowEditing: false,
            }
          }
        });
      }
    })
  }

}
