import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyUsersService } from './services/company-users-service';
import { CompanyUsersCreateRequest } from './request-objects/company-users-create-request';
import { CompanyUsersModel } from './models/company-users-model';
import Constants from 'src/app/shared/tools/constants';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
declare let alertify: any;

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.css'],
})
export class CompanyUsersComponent implements OnInit {
  createRequest: CompanyUsersCreateRequest = null as any;
  companyUserModels: CompanyUsersModel[] = [];
  companyUserModel: CompanyUsersModel | undefined;
  buttonText = Constants.Save;
  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;
  isDetail: boolean = false;

  @ViewChild('userPaginator') paginator: MatPaginator | undefined;

  constructor(private service: CompanyUsersService) {}

  ngOnInit(): void {
    this.createRequest = {
      email: '',
      name: '',
      password: '',
      surname: '',
      isActive: true,
      phoneNumber: '',
      passwordAgain: '',
    };
    this.companyUserModel = {
      email: '',
      name: '',
      surname: '',
      isActive: false,
      phoneNumber: '',
      id: 0,
      password: '',
    };
    this.isDetail = false;
    this.getList();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  getList(): void {
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };

    this.service.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<CompanyUsersModel>;
        this.companyUserModels = response.dynamicClass
          .items as CompanyUsersModel[];

        if (this.paginator) {
          this.paginator.pageIndex = this.pageIndex;
          this.paginator.length = this.total;
        }
      }
    });
  }

  getDetailFromTable(resource: any, id: number): void {
    console.log(resource);
    this.companyUserModel = resource;
    if (this.companyUserModel) {

      this.createRequest = {
        email: resource.email,
        name: resource.name,
        surname: resource.surname,
        isActive: resource.isActive,
        phoneNumber: resource.phoneNumber,
        id: id
      };
       console.log('request', this.createRequest);
      this.buttonText = Constants.Update;
      this.isDetail = true;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  addCompanyUser(): void {
    if (!this.isDetail) {
      this.service.add(this.createRequest).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      });
    } else {
      console.log(this.createRequest);
      this.service.update(this.createRequest).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      });
    }
  }
}
