import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomModel } from '../../../shared/model/classroom-model';
import { ClassroomService } from '../../../shared/services/classroom.service';
import Constants from 'src/app/shared/tools/constants';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
declare let alertify: any;

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
})
export class ClassroomComponent implements OnInit {
  classroom: ClassroomModel | undefined;
  classrooms: ClassroomModel[] = [];
  subServiceId: number | undefined;
  buttonText = Constants.Save;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  @ViewChild('classroomPaginator') paginator: MatPaginator | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ClassroomService,
  ) {}

  ngOnInit() {
    this.classroom = {
      classromName: '',
      createdBy: 0,
      id: 0,
      quta: 0,
    };
    this.getList();
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
      const response = data as PaginateResponse<ClassroomModel>;
      this.classrooms = response.dynamicClass.items as ClassroomModel[];
      if (this.paginator) {
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  getDetailFromTable(resource: any): void {
    this.classroom = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.classroom) {
      if (this.classroom.id == 0) {
        this.service.add(this.classroom).subscribe((data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        });
      } else {
        this.service.update(this.classroom).subscribe((data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        });
      }
    }
  }

  remove(id: number): void {
    const approve = confirm(
      'Derslik silmek üzeresiniz, devam etmek istiyor musunuz?',
    );
    if (approve) {
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
}
