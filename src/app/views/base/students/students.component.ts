import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerFilter } from 'src/app/shared/model/customer-filter';
import { VCustomer } from 'src/app/shared/model/v-customer';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'gsm', 'email',
'birthDate', 'gender'];
  dataSource: MatTableDataSource<VCustomer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  customer: Customer;
  customerList: any[] = [];
  buttonText = 'Kaydet';
  customerFilter: CustomerFilter;
  isReset = false;
  constructor(private service: CustomerService, private router: Router) { }

  ngOnInit() {
    this.customerFilter = {
      address: '',
      isAdult: 0,
      gender: 0,
      name: '',
      surname: ''
    };

    this.customer = {
      address: '',
      birthDate: new Date(), //
      birthPlace: '', //
      bloodGroupId: 0, //
      disease: '',
      email: '', //
      emailRequest: true,//
      facebookAddress: '',//
      facebookParentAddress: '',//
      gender: 0, //
      gsm: '', //
      id: 0, //
      instagramAddress: '',//
      instagramParentAddress: '', //
      isActive: true,//
      isChild: false,//
      linkedinAddress: '',//
      linkedinParentAddress: '',
      name: '', //
      parentEmail: '', //
      parentIdentity: '',//
      parentName: '', //
      parentProf: '', //
      parentSurname: '', //
      parentTypeId: 0,
      phone: '', //
      searchResourceId: 0,//
      smsRequest: false,//
      surname: ''//
    };
    
     const pageRequest: PageRequest = {
          pageIndex: 0,
          pageSize: 50,
          isAllItems: false
        };
    this.service.getList(pageRequest).subscribe((data) => {
      if (data.success){
        this.customerList = data.dynamicClass.items;
        this.dataSource = new MatTableDataSource(this.customerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  getWithFilter(){
    this.service.getListWithFilter(this.customerFilter).subscribe((data) => {
      if (data.success){
        const response = data as PaginateResponse<Customer>;
        this.customerList = response.dynamicClass.items;
      }
    });
  }

  getPackages(val) {
    this.router.navigate(['actual-hareketler/ogrenci-paketleri.html/', val]);
  }

  getAccountTransactions(id){
    this.router.navigate(['finansal-islemler/musteri-cari-hareketleri.html/', id]);
  }

  resetForm(){
    this.ngOnInit();
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
