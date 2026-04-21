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
declare let alertify: any;

@Component({ 
  selector: 'app-lesson-educator',
  templateUrl: './lesson-educator.component.html',
  styleUrls: ['./lesson-educator.component.css']
})
export class LessonEducatorComponent implements OnInit {

  model: LessonEducatorModel;
  list: LessonEducatorModel[] = [];
  lessonList: LessonModel[];
  staffList: StaffModel[] = [];
  buttonText = Constants.Save;
  salaryTypeId: number;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  @ViewChild('paginator') paginator: MatPaginator;


  constructor(private service: LessonEducatorService, private lessonService: LessonService, private staffService: StaffService) { }

  ngOnInit() {
    this.model = {
      createdAt: new Date(),
      id: 0,
      isActive: true,
      seansPrice: 0,
      staffId: 0,
      createdBy: 0,
      lessonId: 0
    };
    this.salaryTypeId = 0;
    this.getList();
    this.getLessons();
    this.getEducators();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  getList(){
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getList(pageRequest).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as LessonEducatorModel[];

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    })
  }

  getLessons(){
    const pageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true
    } as PageRequest;
    this.lessonService.getList(pageRequest).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<LessonModel>;
        this.lessonList = response.dynamicClass.items as LessonModel[];
      }
    })
  }

  getEducators(){
    this.staffService.getTeachers().subscribe((data)=>{
      if(data.success){
        this.staffList = data.dynamicClass as StaffModel[];
      }
    });
  }

  lessonOnChange(id: string){
    this.model.lessonId = parseInt(id);
    console.log(id);
    console.log(this.model);
  }

  staffOnChange(id: string){
    this.model.staffId = parseInt(id);
    this.staffService.getDetails(this.model.staffId).subscribe((data)=>{
      if(data.success){
        const staff = data.dynamicClass as StaffModel;  
        this.salaryTypeId = staff.salaryTypeId;
      }
    });
  }

  getDetailFromTable(resource: any): void {
    this.model = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
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
      this.service.add(this.model).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
      });
    } else {
      this.service.update(this.model).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
      });
    }
  }

  remove(id: number): void {
    const approve = confirm('Ders/Eğitmen ilişkisi silmek üzeresiniz, devam etmek istiyor musunuz?');
    if(approve){
      this.service.remove(id).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        } else {
        }
      });
    }
  }
}
