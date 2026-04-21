import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { VCustomerMainModel } from 'src/app/shared/model/v-customer-main-model';
import { PageRequestWithCustomerId } from 'src/app/shared/requests/page-request-with-customer-id';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-students-actual-packages',
  templateUrl: './students-actual-packages.component.html',
  styleUrls: ['./students-actual-packages.component.css'],
})
export class StudentsActualPackagesComponent implements OnInit {
  list: VCustomerMainModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  name: string = '';
  surname: string = '';
  selectedCustomerId: number = 0;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private service: CustomerLessonService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.selectedCustomerId = parseInt(id);
      this.customerService
        .getDetails(this.selectedCustomerId)
        .subscribe((data) => {
          if (data.success) {
            let customer = data.dynamicClass as Customer;
            this.name = customer.name;
            this.surname = customer.surname;
          }
        });
      this.getList(parseInt(id));
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList(this.selectedCustomerId);
  }

  getList(customerId: number) {
    const pageRequest: PageRequestWithCustomerId = {
      customerId: customerId,
      pageRequest: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isAllItems: false,
      },
    };

    this.service.getListByCustomer(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VCustomerMainModel[];

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  openList(unicKey: string) {
    this.router.navigate([
      'actual-hareketler/ogrenci-paket-icerigi.html/',
      this.selectedCustomerId,
      unicKey,
    ]);
  }
}
