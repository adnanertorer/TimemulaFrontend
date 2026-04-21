import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { VCustomerLessonsTempMain } from 'src/app/shared/model/v-customer-lessons-temp-main';
import { VCustomerMainModel } from 'src/app/shared/model/v-customer-main-model';
import { PageRequestWithCustomerId } from 'src/app/shared/requests/page-request-with-customer-id';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { TempToActualRequest } from 'src/app/shared/requests/temp-to-actual-request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-customer-lesson-detail',
  templateUrl: './customer-lesson-detail.component.html',
  styleUrls: ['./customer-lesson-detail.component.css']
})
export class CustomerLessonDetailComponent implements OnInit {

  list:VCustomerMainModel[] = [];
  tempList:VCustomerLessonsTempMain[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  name:string = "";
  surname:string = "";
  selectedCustomerId: number= 0;
  currentDate: Date = new Date();

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private service: CustomerLessonService,  private activatedRoute: ActivatedRoute,
     private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    console.log(this.currentDate);
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.selectedCustomerId = parseInt(id);
      this.customerService.getDetails(this.selectedCustomerId).subscribe((data)=>{
        if(data.success){
          let customer = data.dynamicClass as Customer;
          this.name = customer.name;
          this.surname = customer.surname;
        }
      })
      this.getList(parseInt(id));
      this.getTempList();
    });
  }

  
 onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList(this.selectedCustomerId);
  }

  getList(customerId: number){
     const pageRequest: PageRequestWithCustomerId = {
      customerId: customerId,
      pageRequest: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isAllItems: false,
      },
    };
    this.service.getListByCustomer(pageRequest).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VCustomerMainModel[];

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;

        this.list.forEach(element => {
          let maxDate: Date = new Date(element.maxFinishDate.toString());
          let now: Date = new Date(this.currentDate.toString());
          if(maxDate < now){
            element.endLesson = true;
          }else{
            element.endLesson = false;
          }
        });
      }
    })
  }

  tempToActual(unicKey: string){
    const requeest: TempToActualRequest = {
      customerId: this.selectedCustomerId,
      uniqueKey: unicKey,
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: true,
      }
    }
    this.service.tempToActual(requeest).subscribe((data)=>{
      if(data.success){
        this.ngOnInit();
      }
    })
  }

  getTempList(){
     const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getTempList(pageRequest).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<any>;
        this.tempList = response.dynamicClass.items as VCustomerLessonsTempMain[];

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    })
  }

  openList(unicKey: string){
     this.router.navigate(['musteri-hizmetleri/paketler-detay.html/', this.selectedCustomerId, unicKey]);
  }

  openForChangePackage(unicKey: string){
    this.router.navigate(['musteri-hizmetleri/paketler-degisiklik.html/', unicKey, this.selectedCustomerId]);
 }


}
