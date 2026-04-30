import { Component, OnInit, ViewChild } from '@angular/core';
import { MyInteger } from 'src/app/shared/model/my-integer';
import { VActualCustomerLessonMainModel } from 'src/app/shared/model/v-actual-customer-lesson-main-model';
import { VActualCustomerLessonModel } from 'src/app/shared/model/v-actual-customer-lesson-model';
import { VDeptCollectionModel } from 'src/app/shared/model/v-dept-collection-model';
import { VPackageCountModel } from 'src/app/shared/model/v-package-count-model';
import { VPaymentModel } from 'src/app/shared/model/v-payment-model';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { DeptCollectionService } from 'src/app/shared/services/dept-collection.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { CashBoxGeneralReportModel } from '../../../shared/model/cash-box-general-report-model';
import { ActualCustomerLessonResourceModel } from 'src/app/shared/model/actual-customer-lesson-resource-model';
import { AccountsStatusModel } from 'src/app/shared/model/accounts-status-model';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CustomerLessonTotalModel } from 'src/app/shared/model/customer-lesson-total-model';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { EarningEducatorModel } from 'src/app/shared/model/earning-educator-model';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { VEarningPackageModel } from 'src/app/shared/model/v-earning-package-model';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { TotalCustomerPackageModel } from 'src/app/shared/model/total-customer-package-model';
import { Customer } from 'src/app/shared/model/customer';
import { MeetingRequestService } from 'src/app/shared/services/meeting-request.service';
import { MainLessonAndDates } from 'src/app/shared/model/main-lesson-and-dates';
import {
  EventRenderedArgs,
  EventSettingsModel,
  ScheduleComponent,
} from '@syncfusion/ej2-angular-schedule';
import { LessonAndDatesModel } from 'src/app/shared/model/lesson-and-dates-model';
import { MeetingRequestModel } from 'src/app/shared/model/meeting-request-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { AuthService } from 'src/app/shared';
declare var ApexCharts: any;

export interface GroupedLessonGraphModel {
  name: string;
  data: SubDataModel[];
}

export interface SubDataModel {
  x: string;
  y: Date[];
}

@Component({
  selector: 'app-main-report',
  templateUrl: './main-report.component.html',
  styleUrls: ['./main-report.component.css'],
})
export class MainReportComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public eventSettings: EventSettingsModel;
  public selectedDate: Date = new Date();

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 1000;

  totalDeptCollect: number = 0;
  totalPayments: number = 0;
  totalCustomer: number = 0;
  totalSaledPackage: number = 0;
  myInteger: MyInteger;
  last3Days: MyInteger;
  saledPackageCount: VPackageCountModel[] = [];
  currentLessonSummaries: VActualCustomerLessonModel[] = [];
  packageData: any;
  cashboxData: any;
  earningPackageData: any;
  totalCustomerPackageData: any;
  lessonsInWeekData: any;
  cashBoxReportModel: CashBoxGeneralReportModel[] = [];
  cashBoxNames: string[] = [];
  actualCustomerLessons: ActualCustomerLessonResourceModel[] = [];
  accountsStatus: AccountsStatusModel;
  customerLessonTotalList: CustomerLessonTotalModel[] = [];
  earningEducator: EarningEducatorModel;
  earningPackageList: VEarningPackageModel[] = [];
  totalCustomerPackageList: TotalCustomerPackageModel[] = [];
  birthdateInWeekCustomers: Customer[] = [];
  meetingInWeekList: MeetingRequestModel[] = [];
  weekLessons: MainLessonAndDates[] = [];
  weekLessonsDataList: GroupedLessonGraphModel[] = [];

  constructor(
    private deptCollectService: DeptCollectionService,
    private paymentService: PaymentService,
    private customerService: CustomerService,
    private actualMainService: ActualCustomerLessonService,
    private cashboxReportService: CashboxService,
    private accountingService: AccountingTransactionService,
    private customerLessonService: CustomerLessonService,
    private educatorCostService: EducatorCostService,
    private artPackageService: ArtPackageService,
    private meetingService: MeetingRequestService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.earningEducator = {
      educatorId: 0,
      educatorName: '',
      cost: 0,
    };
    this.myInteger = {
      result: 0,
    };
    this.last3Days = {
      result: 0,
    };
    this.accountsStatus = {
      totalCompanyDept: 0,
      totalCustomerDept: 0,
    };
    this.getTotalDeptCollect();
    this.getTotalPayment();
    this.getTotalCustomer();
    this.getTotalSaledPackage();
    this.getTodayStudents();
    this.getPackageCount();
    this.getCurrentLessonsSummaries();
    this.getCashBoxGeneralReport();
    this.getActiveLessons();
    this.getAccountStatus();
    this.getCustomerLessonTotal();
    this.getEarningEducator();
    this.getEarningPackages();
    this.getTotalCustomerPackages();
    this.getMeetingInWeek();
    this.getLessonsInWeek();
  }

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }

  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.categoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor =
        categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  getTotalDeptCollect() {
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.deptCollectService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        this.totalDeptCollect = 0;
         const response = data as PaginateResponse<VDeptCollectionModel>;
        const collects = response.dynamicClass
        .items as VDeptCollectionModel[];
        collects.forEach((element) => {
          this.totalDeptCollect += element.collectionAmount;
        });
      }
    });
  }

  getTotalPayment() {
     const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.paymentService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        this.totalPayments = 0;
        const response = data as PaginateResponse<VPaymentModel>;
        const payments = response.dynamicClass.items as VPaymentModel[];
        payments.forEach((element) => {
          this.totalPayments += element.paymentAmount;
        });
      }
    });
  }

  getTotalCustomer() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.customerService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        this.totalCustomer = 0;
        const response = data as PaginateResponse<Customer>;
        this.totalCustomer = response.dynamicClass.items.length;
      }
    });
  }

  getCurrentLessonsSummaries() {
     const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.actualMainService.getCurrentLessonSummary(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<VActualCustomerLessonModel>;
        this.currentLessonSummaries = response.dynamicClass.items;
      }
    });
  }

  getTotalSaledPackage() {
     const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.actualMainService.getLessonMains(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<VActualCustomerLessonMainModel>;
        this.totalSaledPackage = 0;
        const saledPackages = response.dynamicClass.items as VActualCustomerLessonMainModel[];
        this.totalSaledPackage = saledPackages.length;
      }
    });
  }

  getTodayStudents() {
    this.actualMainService.getTotalStudentInToday().subscribe((data) => {
      if (data.success) {
        this.myInteger = data.dynamicClass as MyInteger;
      }
    });
  }

  getLast3Days() {
    this.actualMainService.daysBeforeEnd().subscribe((data) => {
      if (data.success) {
        this.last3Days = data.dynamicClass as MyInteger;
      }
    });
  }

  getCashBoxGeneralReport() {
    this.cashboxReportService.generalReport().subscribe((data) => {
      if (data.success) {
        this.cashBoxReportModel =
          data.dynamicClass as CashBoxGeneralReportModel[];
      }
    });
  }

  getPackageCount() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.actualMainService.getSaledPackageCount(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<VPackageCountModel>;
        this.saledPackageCount = response.dynamicClass.items;
        const countPackage: number[] = [];
        const packageName: string[] = [];

        this.saledPackageCount.forEach((element) => {
          countPackage.push(element.subCategoryCount);
          packageName.push(
            element.subCategoryName + ' ' + element.artPackageName,
          );
        });
        this.packageData = {
          series: countPackage,
          title: {
            floating: false,
            text: 'Paket Satış Oranı',
            align: 'left',
            style: {
              fontSize: '16px',
            },
          },
          labels: packageName,
          dataLabels: {
            enabled: true,
          },
          chart: {
            width: '100%',
            height: 1200,
            type: 'pie',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
              autoSelected: 'zoom',
            },
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
          },
          responsive: [
            {
              breakpoint: 750,
              options: {
                chart: {
                  width: 650,
                },
              },
            },
          ],
        };
        if (this.saledPackageCount.length > 0) {
          document.querySelector('#packages').innerHTML = '';
          var team = new ApexCharts(
            document.querySelector('#packages'),
            this.packageData,
          );
          team.render();
        }
      }
    });
  }

  getActiveLessons() {
     const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.actualMainService.getActiveLessons(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<ActualCustomerLessonResourceModel>;
        this.actualCustomerLessons = response.dynamicClass.items;
      }
    });
  }

  getAccountStatus() {
    this.accountingService.getAccountStatus().subscribe((data) => {
      if (data.success) {
        this.accountsStatus = data.dynamicClass as AccountsStatusModel;
      }
    });
  }

  getCustomerLessonTotal() {
    this.customerLessonService.getCustomerLessonTotal().subscribe((data) => {
      if (data.success) {
        this.customerLessonTotalList =
          data.dynamicClass as CustomerLessonTotalModel[];
        this.customerLessonTotalList = this.customerLessonTotalList.filter(
          (item) => item.total == 1,
        );
      }
    });
  }

  getEarningEducator() {
    this.educatorCostService.getEarning().subscribe((data) => {
      if (data.success) {
        this.earningEducator = data.dynamicClass as EarningEducatorModel;
      }
    });
  }

  getBirthdayInWeek() {
    this.customerService.getBirthdayInWeek().subscribe((data) => {
      if (data.success) {
        this.birthdateInWeekCustomers = data.dynamicClass as Customer[];
      }
    });
  }

  getTotalCustomerPackages() {
    this.customerLessonService.getTotalCustomerPackages().subscribe((data) => {
      if (data.success) {
        this.totalCustomerPackageList =
          data.dynamicClass as TotalCustomerPackageModel[];
        const totalPackage: number[] = [];
        const customerNames: string[] = [];

        this.totalCustomerPackageList.forEach((element) => {
          totalPackage.push(element.total);
          customerNames.push(element.name + ' ' + element.surname);
        });
        this.totalCustomerPackageData = {
          series: totalPackage,
          title: {
            floating: false,
            text: 'En çok paket alan müşteriler',
            align: 'left',
            style: {
              fontSize: '16px',
            },
          },
          labels: customerNames,
          dataLabels: {
            enabled: true,
          },
          chart: {
            width: '100%',
            height: 1200,
            type: 'pie',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
              autoSelected: 'zoom',
            },
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
          },
          responsive: [
            {
              breakpoint: 750,
              options: {
                chart: {
                  width: 650,
                },
              },
            },
          ],
        };
        if (totalPackage.length > 0) {
          document.querySelector('#totalCustomerPackages').innerHTML = '';
          var team = new ApexCharts(
            document.querySelector('#totalCustomerPackages'),
            this.totalCustomerPackageData,
          );
          team.render();
        }
      }
    });
  }

  getEarningPackages() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.artPackageService.getEarningPackage(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<VEarningPackageModel>;
        this.earningPackageList = response.dynamicClass.items;
        const costPackage: number[] = [];
        const packageName: string[] = [];

        this.earningPackageList.forEach((element) => {
          costPackage.push(element.debt);
          packageName.push(
            element.subCategoryName + ' ' + element.artPackageName,
          );
        });
        this.earningPackageData = {
          series: costPackage,
          title: {
            floating: false,
            text: 'Paket Kazandırma Oranı',
            align: 'left',
            style: {
              fontSize: '16px',
            },
          },
          labels: packageName,
          dataLabels: {
            enabled: true,
          },
          chart: {
            width: '100%',
            height: 1200,
            type: 'pie',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
              autoSelected: 'zoom',
            },
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
          },
          responsive: [
            {
              breakpoint: 750,
              options: {
                chart: {
                  width: 650,
                },
              },
            },
          ],
        };
        if (this.earningPackageList.length > 0) {
          document.querySelector('#earningPackages').innerHTML = '';
          var team = new ApexCharts(
            document.querySelector('#earningPackages'),
            this.earningPackageData,
          );
          team.render();
        }
      }
    });
  }

  getMeetingInWeek() {
     const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.meetingService.getMeetingInWeek(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<MeetingRequestModel>;
        this.meetingInWeekList = response.dynamicClass.items;
      }
    });
  }

  getLessonsInWeek() {
    this.actualMainService.getLessonsInWeek().subscribe((data) => {
      if (data.success) {
        this.weekLessons = data.dynamicClass as MainLessonAndDates[];
        let counter = 0;
        let subModelList: LessonAndDatesModel[] = [];
        this.weekLessons.forEach((element) => {
          subModelList.push(element.lessonAndDates);
        });
        subModelList.forEach((element) => {
          counter++;
          element.id = counter.toString();
          element.categoryColor = 'Orange';
          element.startDate = element.lessonDates[0];
          element.finishedDate = element.lessonDates[1];
        });
        console.log(subModelList);
        this.eventSettings = {
          dataSource: subModelList,
          fields: {
            id: 'id',
            subject: { name: 'name' },
            startTime: { name: 'startDate' },
            endTime: { name: 'finishedDate' },
          },
          allowAdding: false,
          allowDeleting: false,
          allowEditing: false,
        };
      }
    });
  }
}
