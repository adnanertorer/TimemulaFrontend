import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LessonEducatorModel } from 'src/app/shared/model/lesson-educator-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import Constants from 'src/app/shared/tools/constants';
import { SalaryTypeEnum } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-create-lesson-educator',
  templateUrl: './create-lesson-educator.component.html',
  styleUrls: ['./create-lesson-educator.component.css'],
})
export class CreateLessonEducatorComponent implements OnInit {
  model: LessonEducatorModel;
  modelList: LessonEducatorModel[] = [];
  lessonList: LessonModel[];
  staffList: StaffModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  isSeancePrice: boolean = false;

  @ViewChild('paginator') paginator: MatPaginator;

   total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  constructor(
    private service: LessonEducatorService,
    private lessonService: LessonService,
    private staffService: StaffService,
  ) {}

  ngOnInit() {
    this.model = {
      createdAt: new Date(),
      id: 0,
      isActive: true,
      seansPrice: 0,
      staffId: 0,
      createdBy: 0,
      lessonId: 0,
    };
    this.isSeancePrice = false;
    this.getList();
    this.getLessons();
    this.getEducators();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }
  
  getList() {
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.modelList = response.dynamicClass.items as any[];
        
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  getLessons() {
    const pageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    } as PageRequest;
    this.lessonService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<LessonModel>;
        this.lessonList = response.dynamicClass.items as LessonModel[];
      }
    });
  }

  getEducators() {
    this.staffService.getTeachers().subscribe((data) => {
      if (data.success) {
        this.staffList = data.dynamicClass as StaffModel[];
      }
    });
  }

  getDetailFromTable(resource: any): void {
    this.model = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  getChangedStaff(id: any): void {
    this.staffService.getDetails(parseInt(id)).subscribe((data) => {
      if (data.success) {
        const staff = data.dynamicClass as StaffModel;
        this.model.staffId = staff.id;
        if (staff.salaryTypeId == SalaryTypeEnum.Seance) {
          this.isSeancePrice = true;
        }
      }
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    this.model.lessonId = parseInt(this.model.lessonId.toString());
    this.model.staffId = parseInt(this.model.staffId.toString());
    this.model.seansPrice = parseFloat(this.model.seansPrice.toString());
    if (this.model.id == 0) {
      this.service.add(this.model).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.model).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    }
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }
}
