import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { BloodGroupModel } from 'src/app/shared/model/blood-group-model';
import { CustomerFilter } from 'src/app/shared/model/customer-filter';
import { GenderModel } from 'src/app/shared/model/gender-model';
import { ParentTypeModel } from 'src/app/shared/model/parent-type-model';
import { SearchResourceModel } from 'src/app/shared/model/search-resource-model';
import { BloodGroupService } from 'src/app/shared/services/blood-group.service';
import { ParentTypeService } from 'src/app/shared/services/parent-type.service';
import { SearchResourceService } from 'src/app/shared/services/search-resource.service';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../shared/services/customer.service';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { AuthService } from 'src/app/shared';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  @ViewChild('date')
  public Date: DatePickerComponent | undefined;
  public dateValue: Date = new Date();

  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month, 7);
  public maxDate: Date = new Date(this.fullYear, this.month, 27);

  startDateModel: NgbDateStruct | undefined;

  customer: Customer | undefined;
  customerList: any[] = [];
  bloodGroups: BloodGroupModel[] = [];
  searchServices: SearchResourceModel[] = [];
  parentTypes: ParentTypeModel[] = [];
  genders: GenderModel[] = [];
  buttonText = 'Kaydet';
  form: UntypedFormGroup | undefined;
  customerFilter: CustomerFilter | undefined;
  isNewRecord: boolean = false;
  isVisibleAddButton = true;
  isReset = false;

  displayedColumns: string[] = [
    'name',
    'gsm',
    'birthDate',
    'isChild',
    'isActive',
    'id',
  ];
  dataSource = new MatTableDataSource<Customer>();
  @ViewChild('customerPaginator') paginator: MatPaginator | undefined;
  @ViewChild('customerSort') sort: MatSort | undefined;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  constructor(
    private service: CustomerService,
    private bloodGroupService: BloodGroupService,
    private serviceSearch: SearchResourceService,
    private parentTypeService: ParentTypeService,
    private router: Router,
    private authService: AuthService
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.isReset = false;
    this.isVisibleAddButton = true;
    this.isNewRecord = false;
    this.customerFilter = {
      address: '',
      isAdult: 0,
      gender: 0,
      name: '',
      surname: '',
    };

    this.customer = {
      address: '',
      birthDate: new Date(), //
      birthPlace: '', //
      disease: '',
      email: '', //
      emailRequest: true, //
      facebookAddress: '', //
      facebookParentAddress: '', //
      gender: 0, //
      gsm: '', //
      id: 0, //
      instagramAddress: '', //
      instagramParentAddress: '', //
      isActive: true, //
      isChild: false, //
      linkedinAddress: '', //
      linkedinParentAddress: '',
      name: '', //
      parentEmail: '', //
      parentIdentity: '', //
      parentName: '', //
      parentProf: '', //
      parentSurname: '', //
      phone: '', //
      smsRequest: false, //
      surname: '', //
    };
    //246adf92d70bd32e9cb4963b720132874b75c173

    this.form = new UntypedFormGroup({
      address: new UntypedFormControl(
        this.customer.address,
        Validators.required,
      ),
      birthDate: new UntypedFormControl(
        this.customer.birthDate,
        Validators.required,
      ),
      birthPlace: new UntypedFormControl(
        this.customer.birthPlace,
        Validators.required,
      ),
      bloodGroupId: new UntypedFormControl(
        this.customer.bloodGroupId,
        Validators.required,
      ),
      name: new UntypedFormControl(this.customer.name, Validators.required),
      disease: new UntypedFormControl(this.customer.disease, null),
      email: new UntypedFormControl(this.customer.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      //'emailRequest':new FormControl(this.customer.emailRequest, Validators.required),
      facebookAddress: new UntypedFormControl(
        this.customer.facebookAddress,
        null,
      ),
      facebookParentAddress: new UntypedFormControl(
        this.customer.facebookAddress,
        null,
      ),
      gender: new UntypedFormControl(this.customer.gender, Validators.required),
      gsm: new UntypedFormControl(this.customer.gsm, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      id: new UntypedFormControl(this.customer.id, null),
      instagramAddress: new UntypedFormControl(
        this.customer.instagramAddress,
        null,
      ),
      instagramParentAddress: new UntypedFormControl(
        this.customer.instagramParentAddress,
        null,
      ),
      //  'isActive': new FormControl(this.customer.isActive, Validators.required),
      isChild: new UntypedFormControl(
        this.customer.isActive,
        Validators.required,
      ),
      linkedinAddress: new UntypedFormControl(
        this.customer.linkedinAddress,
        null,
      ),
      linkedinParentAddress: new UntypedFormControl(
        this.customer.linkedinParentAddress,
        null,
      ),
      parentEmail: new UntypedFormControl(
        this.customer.parentEmail,
        Validators.email,
      ),
      parentIdentity: new UntypedFormControl(this.customer.parentIdentity, [
        Validators.required,
        Validators.max(99999999999),
        Validators.min(11111111111),
      ]),
      parentName: new UntypedFormControl(this.customer.parentName, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      parentProf: new UntypedFormControl(this.customer.parentProf, null),
      parentSurname: new UntypedFormControl(this.customer.parentSurname, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      parentTypeId: new UntypedFormControl(this.customer.parentTypeId),
      phone: new UntypedFormControl(this.customer.phone, null),
      searchResourceId: new UntypedFormControl(this.customer.searchResourceId),
      //'smsRequest': new FormControl(this.customer.smsRequest, Validators.required),
      surname: new UntypedFormControl(this.customer.surname, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });

    this.getList();
    this.getGenders();
    this.getBloodGroups();
    this.getSearchResources();
    this.getParentTypes();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  onDateChange() {
    if (this.Date) {
      this.dateValue = this.Date.value;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDetail(val: any) {
    this.router.navigate([]).then((result) => {
      window.open(`musteriler/detay/${val}`, '_self');
    });
  }

  getServices(val: any) {
    this.router.navigate(['musteri-hizmetleri/paketler.html/', val]);
  }

  getHealts(val: any) {
    this.router.navigate([
      'genel-tanimlar/musteri-saglik-bilgileri.html/',
      val,
    ]);
  }

  openNewRecord() {
    this.isVisibleAddButton = false;
    this.isNewRecord = true;
    this.isReset = true;
  }

  getDateErrorMessage(pickerInput: string): string {
    if (!pickerInput || pickerInput === '') {
      return 'Lütfen bir tarih seçiniz';
    }
    return '';
  }

  getGenders() {
    this.service.genders().subscribe((data) => {
      if (data.success) {
        this.genders = data.dynamicClass as GenderModel[];
      }
    });
  }

  getBloodGroups() {
    this.bloodGroupService.getList().subscribe((data) => {
      if (data.success) {
        this.bloodGroups = data.dynamicClass as BloodGroupModel[];
      }
    });
  }

  getSearchResources() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 50,
      isAllItems: false,
    };
    this.serviceSearch.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<SearchResourceModel>;
        this.searchServices = response.dynamicClass.items;
      }
    });
  }

  getParentTypes() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.parentTypeService.getActiveList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<ParentTypeModel>;
        this.parentTypes = response.dynamicClass.items;
      }
    });
  }

  // tslint:disable-next-line: typedef
  getList() {
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<Customer>;
        this.customerList = response.dynamicClass.items;
        this.total = response.dynamicClass.count;
        this.pageIndex = response.dynamicClass.index;
        this.dataSource.data = this.customerList;

        if (this.paginator) {
          this.paginator.pageIndex = this.pageIndex;
          this.paginator.length = this.total;
        }
      }
    });
  }

  getWithFilter() {
    if (this.customerFilter) {
      this.service.getListWithFilter(this.customerFilter).subscribe((data) => {
        if (data.success) {
          this.customerList = data.dynamicClass as any[];
          this.dataSource.data = this.customerList;
          this.dataSource.paginator = this.paginator || null;
          this.dataSource.sort = this.sort || null;
        }
      });
    }
  }

  resetForm() {
    this.ngOnInit();
  }

  getDetailFromTable(resource: any): void {
    this.openNewRecord();
    var id = parseInt(resource.id);
    this.service.getDetails(id).subscribe((data) => {
      if (data.success) {
        this.customer = data.dynamicClass as Customer;
        this.buttonText = 'Güncelle';
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }

  add(): void {
    console.log(this.customer);
    if (this.customer && this.customer.id === 0) {
      // tslint:disable-next-line: radix
      this.customer.bloodGroupId =
        this.customer.bloodGroupId != undefined
          ? parseInt(this.customer.bloodGroupId.toString())
          : undefined;
      // tslint:disable-next-line: radix
      this.customer.parentTypeId =
        this.customer.parentTypeId != undefined
          ? parseInt(this.customer.parentTypeId.toString())
          : undefined;
      // tslint:disable-next-line: radix
      this.customer.searchResourceId =
        this.customer.searchResourceId != undefined
          ? parseInt(this.customer.searchResourceId.toString())
          : undefined;
      this.customer.parentIdentity = this.customer.parentIdentity.toString();
      this.customer.birthDate = new Date(
        this.dateValue.getFullYear(),
        this.dateValue.getMonth(),
        this.dateValue.getDate(),
        0,
        0,
        0,
        0,
      );
      this.service.add(this.customer).subscribe(
        (data) => {
          if (data.success) {
            alert(data.clientMessage);
            this.ngOnInit();
          } else {
            alert(data.clientMessage);
          }
        },
        (err) => {
          alert(err);
        },
      );
    } else if (this.customer) {
      this.service.update(this.customer).subscribe((data) => {
        if (data.success) {
          alert(data.clientMessage);
          this.ngOnInit();
        } else {
          alert(data.clientMessage);
        }
      });
    }
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        alert(data.clientMessage);
        this.ngOnInit();
      } else {
        alert(data.clientMessage);
      }
    });
  }

  reset(): void {
    this.buttonText = 'Kaydet';
    this.ngOnInit();
  }

  parseDate(dateString: string): Date | null {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
