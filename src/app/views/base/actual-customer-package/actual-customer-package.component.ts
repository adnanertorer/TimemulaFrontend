import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ActualCustomerLessonModel } from 'src/app/shared/model/actual-customer-lesson-model';
import { ActualForMoveModel } from 'src/app/shared/model/actual-for-move-model';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { ClassroomModel } from 'src/app/shared/model/classroom-model';
import { CriteriaFilterModel } from 'src/app/shared/model/criteria-filter-model';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerLesson } from 'src/app/shared/model/customer-lesson';
import { EducatorDaysHoursModel } from 'src/app/shared/model/educator-days-hours-model';
import { FilterResponseModel } from 'src/app/shared/model/filter-response-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { SellPackageCriteriaModel } from 'src/app/shared/model/sell-package-criteria-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { PageRequestLessonById } from 'src/app/shared/requests/page_request_lesson_by_id';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { EducatorDaysHoursService } from 'src/app/shared/services/educator-days-hours.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import Constants from 'src/app/shared/tools/constants';
import { daysEnum, participantEnum } from 'src/environments/environment';

declare let alertify: any;

export interface dayOf {
  dayIndex: number;
}

export interface GroupedListModel {
  resultIndex: number;
  classroom: string;
  title: string;
  classroomId: number;
  status: boolean;
  lessonDetailId?: number;
}

WebGLContextEvent;

@Component({
  selector: 'app-actual-customer-package',
  templateUrl: './actual-customer-package.component.html',
  styleUrls: ['./actual-customer-package.component.css'],
})
export class ActualCustomerPackageComponent implements OnInit {
  @ViewChild('date')
  public Date: DatePickerComponent;

  public dateValue: Date = new Date();
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month, 7);
  public maxDate: Date = new Date(this.fullYear, this.month, 27);

  startDateModel: NgbDateStruct;

  time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  timeLast: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

  actualMoveModel: ActualForMoveModel;
  customerLesson: CustomerLesson;
  customer: Customer;
  lesson: LessonModel;
  package: ArtPackageModel;
  actualCustomerPackage: ActualCustomerLessonModel;
  dayOfI: dayOf;
  criteria: CriteriaFilterModel;
  customerLessons: CustomerLesson[];
  classrooms: ClassroomModel[] = [];
  lessons: VLessons[] = [];
  artPackages: ArtPackageModel[] = [];
  selectedPackage: ArtPackageModel;
  staffs: StaffModel[] = [];
  filterResponses: FilterResponseModel[] = [];
  filterDetailResponses: FilterResponseModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  closedGroup: number = participantEnum.closedGroup;
  personCount: number = 1;
  selectedDays: dayOf[] = [];
  dayList: daysEnum;
  groupedList: GroupedListModel[] = [];
  showDetail: boolean = false;
  selectedLessonDetailId: number = 0;
  selectedUnicKey: string = '';
  lessonNameStr: string = '';
  packageNameStr: string = '';
  customerNameStr: string = '';
  educatorNameStr: string = '';
  selectedCustomerId: number = 0;
  criteriaModel: SellPackageCriteriaModel;
  educatorDayHours: EducatorDaysHoursModel[] = [];

  public weekDays: daysEnum[] = [
    daysEnum.Pazartesi,
    daysEnum.Sali,
    daysEnum.Carsamba,
    daysEnum.Persembe,
    daysEnum.Cuma,
    daysEnum.Cumartesi,
    daysEnum.Pazar,
  ];
  public dayLabels = [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ];

  public customerCtrl: UntypedFormControl = new UntypedFormControl();
  public customerFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredCustomers: ReplaySubject<Customer[]> = new ReplaySubject(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject();

  constructor(
    private service: ActualCustomerLessonService,
    private activateRoot: ActivatedRoute,
    private lessonService: LessonService,
    private packageService: ArtPackageService,
    private customerService: CustomerService,
    private staffService: StaffService,
    private educatorDayHourService: EducatorDaysHoursService,
  ) {}

  ngOnInit() {
    this.actualMoveModel = {
      newId: 0,
      oldId: 0,
      classroomId: 0,
      educatorId: 0,
      finishDate: new Date(),
      startDate: new Date(),
    };

    this.criteriaModel = {
      dayAndHourList: [],
      lessonId: 0,
      packageId: 0,
      startTime: new Date(),
      educatorId: 0,
      customerId: 0,
    };

    this.customerLesson = {
      artPackageId: 0,
      categoryId: 0,
      classroomId: 0,
      createdAt: new Date(),
      createdBy: 0,
      customerId: 0,
      finishDate: new Date(),
      id: 0,
      isDone: false,
      lessonId: 0,
      startDate: new Date(),
      subCategoryId: 0,
      unicStrId: '',
      educatorId: 0,
    };

    this.actualCustomerPackage = {
      createdAt: new Date(),
      createdBy: 0,
      customerId: 0,
      finishDate: new Date(),
      id: 0,
      isDone: false,
      lessonId: 0,
      startDate: new Date(),
      unicStrId: '',
      artPackageId: 0,
      classroomId: 0,
      customerLessonDetailId: 0,
      educatorId: 0,
    };

    this.dayOfI = {
      dayIndex: 0,
    };

    this.criteria = {
      days: [],
      lessonId: 0,
      packageId: 0,
      packetHour: '',
      startDate: null,
      finishDate: null,
    };

    this.activateRoot.params.subscribe((params) => {
      const id = params['id'];
      this.selectedLessonDetailId = parseInt(id);
      this.service.getDetails(this.selectedLessonDetailId).subscribe((data) => {
        if (data.success) {
          this.customerLesson = data.dynamicClass as CustomerLesson;
          this.selectedCustomerId = this.customerLesson.customerId;
          this.criteriaModel.customerId = this.selectedCustomerId;
          this.actualCustomerPackage.artPackageId =
            this.customerLesson.artPackageId;
          this.actualCustomerPackage.classroomId = this.customerLesson.lessonId;
          this.actualCustomerPackage.createdAt = new Date();
          this.actualCustomerPackage.createdBy = 0;
          this.actualCustomerPackage.customerId =
            this.customerLesson.customerId;
          this.actualCustomerPackage.customerLessonDetailId =
            this.selectedLessonDetailId;
          this.actualCustomerPackage.educatorId = 0;
          this.actualCustomerPackage.finishDate = new Date();
          this.actualCustomerPackage.id = 0;
          this.actualCustomerPackage.isDone = this.customerLesson.isDone;
          this.actualCustomerPackage.lessonId = this.customerLesson.lessonId;
          this.actualCustomerPackage.startDate = new Date();
          this.actualCustomerPackage.unicStrId = this.customerLesson.unicStrId;

          this.getStaffs();

          this.lessonService
            .getDetails(this.actualCustomerPackage.lessonId)
            .subscribe((data) => {
              if (data.success) {
                this.lesson = data.dynamicClass as LessonModel;
                this.lessonNameStr = this.lesson.lessonName;
              }
            });

          this.packageService
            .getDetails(this.actualCustomerPackage.artPackageId)
            .subscribe((data) => {
              if (data.success) {
                this.package = data.dynamicClass as ArtPackageModel;
                this.packageNameStr = this.package.artPackageName;
              }
            });

          this.customerService
            .getDetails(this.actualCustomerPackage.customerId)
            .subscribe((data) => {
              if (data.success) {
                this.customer = data.dynamicClass as Customer;
                this.customerNameStr =
                  this.customer.name + ' ' + this.customer.surname;
              }
            });

          this.staffService
            .getDetails(this.customerLesson.educatorId)
            .subscribe((data) => {
              if (data.success) {
                const staff = data.dynamicClass as StaffModel;
                this.educatorNameStr = staff.name + ' ' + staff.surname;
              }
            });
        }
      });
    });
  }

  getEducatorDayHours(id: number) {
    this.educatorDayHourService.getByEducator(id).subscribe((data) => {
      if (data.success) {
        this.educatorDayHours = data.dynamicClass as EducatorDaysHoursModel[];
      }
    });
  }

  onDateChange() {
    this.dateValue = this.Date.value;
  }

  getStaffs() {
    const pageRequest: PageRequestLessonById = {
      lessonId: this.actualCustomerPackage.lessonId,
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: true,
      },
    };
    this.staffService.getTeachersByLesson(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.staffs = response.dynamicClass.items as StaffModel[];
      }
    });
  }
  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  dayOnChange(id) {
    const day: dayOf = {
      dayIndex: parseInt(id),
    };
    if (!this.selectedDays.includes(day)) {
      if (parseInt(id) !== -1) {
        this.selectedDays.push(day);
      }
    } else {
      if (parseInt(id) !== -1) {
        alert(this.dayLabels[day.dayIndex] + ' zaten seçilmiş');
      }
    }
  }

  sendCriteria() {
    this.filterDetailResponses = [];
    this.criteria.customerId = this.selectedCustomerId;
    this.criteria.days = this.selectedDays;
    this.criteria.lessonId = this.customerLesson.lessonId;
    this.criteria.packageId = this.customerLesson.artPackageId;
    this.criteria.startDate = new Date(
      this.dateValue.getFullYear(),
      this.dateValue.getMonth(),
      this.dateValue.getDate(),
      this.time.hour,
      this.time.minute,
      0,
      0,
    );
    this.criteria.finishDate = new Date(
      this.dateValue.getFullYear(),
      this.dateValue.getMonth(),
      this.dateValue.getDate(),
      this.timeLast.hour,
      this.timeLast.minute,
      0,
      0,
    );
    let counter = 0;
    this.criteria.unicKey = this.customerLesson.unicStrId;
    this.criteria.educatorId = this.actualCustomerPackage.educatorId;

    this.service.getListByFilter(this.criteria).subscribe((data) => {
      if (data.success) {
        this.groupedList = [];
        this.filterResponses = data.dynamicClass as FilterResponseModel[];
        console.log(this.filterResponses);
        this.filterResponses.forEach((element) => {
          const list = this.groupedList.filter(
            (i) => i.classroom === element.classroomName,
          );
          if (list.length == 0 || this.groupedList.length == 0) {
            if (element.isClosed) {
              const model: GroupedListModel = {
                resultIndex: counter,
                title: `${element.description} - ${element.lessonName}`,
                classroom: element.classroomName,
                classroomId: element.classroomId,
                status: element.isClosed,
                lessonDetailId: 0,
              };
              this.groupedList.push(model);
              console.log(model);
            } else {
              const model: GroupedListModel = {
                resultIndex: counter,
                title: `${element.classroomName} - ${element.lessonName} (${element.priority}. Öncelikli) Dersin Kontenjan Durumu = ${element.customerCount + '/' + element.lessonCapacity}
                Sınıfın Kontenjan Durumu = ${element.customerCount + '/' + element.classroomCapacity} (${element.reason}) Dersin Başlama ve Bitiş Zamanı = ${element.lessonStart} / ${element.lessonFinish})`,
                classroom: element.classroomName,
                classroomId: element.classroomId,
                status: element.isClosed,
                lessonDetailId: element.lessonDetailId, //newId
              };

              this.groupedList.push(model);
            }
            counter++;
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredCustomers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Customer, b: Customer) =>
          a && b && a.id === b.id;
      });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(resource: FilterResponseModel) {
    this.actualMoveModel.newId = resource.lessonDetailId;
    this.actualMoveModel.oldId = this.selectedLessonDetailId;
    this.actualMoveModel.classroomId = resource.classroomId;
    this.actualMoveModel.educatorId = this.actualCustomerPackage.educatorId;
    this.actualMoveModel.finishDate = resource.lessonFinish;
    this.actualMoveModel.startDate = resource.lessonStart;
    this.service.add(this.actualMoveModel).subscribe((data) => {
      if (data.success) {
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(data.clientMessage, 2);
      }
    });
  }
}
