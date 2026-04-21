import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { VCustomerLessonModel } from 'src/app/shared/model/v-customer-lesson-model';
import { GetListByPackageRequest } from 'src/app/shared/requests/get-list-by-package-request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer-main-package-list',
  templateUrl: './customer-main-package-list.component.html',
  styleUrls: ['./customer-main-package-list.component.css'],
})
export class CustomerMainPackageListComponent implements OnInit {
  list: VCustomerLessonModel[] = [];
  displayedColumns: string[] = [
    'artPackageName',
    'lessonName',
    'classromName',
    'startDate',
    'finishDate',
    'isDone',
    'id',
  ];
  pageOfItems: Array<any>;
  name: string = '';
  surname: string = '';
  dataSource = new MatTableDataSource<any>();
  
  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;

  selectedCustomerId: number = 0;
  selectedUnicKey: string = '';

  @ViewChild('lessonsPaginator') paginator: MatPaginator;
  @ViewChild('lessonsSort') sort: MatSort;

  constructor(
    private service: CustomerLessonService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private actualService: ActualCustomerLessonService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const customerId = params['customerId'];
      const unicKey = params['unicKey'];
      this.customerService
        .getDetails(parseInt(customerId))
        .subscribe((data) => {
          if (data.success) {
            let customer = data.dynamicClass as Customer;
            this.name = customer.name;
            this.surname = customer.surname;
          }
        });
      this.selectedCustomerId = parseInt(customerId);
      this.selectedUnicKey = unicKey;
      this.getList(this.selectedCustomerId, this.selectedUnicKey);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList(customerId: number, unicStrId: string) {
    const request: GetListByPackageRequest = {
      customerId: customerId,
      unicStr: unicStrId,
      pageRequest: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isAllItems: false,
      },
    };
    this.actualService.getListByPackage(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VCustomerLessonModel[];

        this.total = response.dynamicClass.count;
        this.pageIndex = response.dynamicClass.index;
        this.dataSource.data = this.list;
        
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;

      }
    });
  }

  lessonCancel() {
    const lastLesson = this.list[this.list.length - 1];
  }

 onPage(e: PageEvent) {
    console.log(e);
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList(this.selectedCustomerId, this.selectedUnicKey);
  }

  openPackageMove(id: number) {
    this.router.navigate(['musteri-hizmetleri/ders-kaydir.html/', id]);
  }

  cancelLesson(id: number) {
    this.actualService.cancelLesson(id).subscribe((data) => {
      if (data.success) {
        alert('Ders iptal edildi');
        this.ngOnInit();
      }
    });
  }
}
