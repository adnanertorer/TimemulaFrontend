import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EducatorCostModel } from 'src/app/shared/model/educator-cost-model';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { EducatorLessonCostModalComponent } from '../educator-lesson-cost-modal/educator-lesson-cost-modal.component';
import { CustomerLessonModel } from 'src/app/shared/model/customer-lesson-model';
import { PageRequestWithEducatorId } from 'src/app/shared/requests/page-request-with-educator-id';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';

@Component({
  selector: 'app-educator-prepare-price',
  templateUrl: './educator-prepare-price.component.html',
  styleUrls: ['./educator-prepare-price.component.css'],
})
export class EducatorPreparePriceComponent implements OnInit {
  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  programTotal: number = 0;
  programPageIndex: number = 0;
  programPageSize: number = 50;

  modalData: EducatorCostModel;
  lessonList: CustomerLessonModel[] = [];
  doneLessonList: CustomerLessonModel[] = [];
  costList: EducatorCostModel[] = [];

  displayedColumns: string[] = [
    'educatorName',
    'classromName',
    'startDate',
    'artPackageName',
    'lessonName',
    'educatorId',
  ];
  dataSource = new MatTableDataSource<CustomerLessonModel>();

  costDisplayColums: string[] = [
    'name',
    'cost',
    'lessonName',
    'cashBoxName',
    'createdAt',
    'description',
    'id',
  ];
  costDataSource = new MatTableDataSource<EducatorCostModel>();
  educatorName: string = '';
  selectedEducatorId: number = 0;

  @ViewChild('programPaginator') paginator: MatPaginator;
  @ViewChild('programSort') sort: MatSort;

  @ViewChild('paginatorCosts') paginatorCosts: MatPaginator;
  @ViewChild('costSort') sortCosts: MatSort;

  totalCost: number = 0;

  constructor(
    private service: ActualCustomerLessonService,
    private activateRoute: ActivatedRoute,
    private educatorCostService: EducatorCostService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.modalData = {
      cost: 0,
      createdAt: new Date(),
      description: '',
      id: 0,
      educatorId: 0,
      createdBy: 0,
      cashBoxId: 0,
      currentDate: new Date(),
      lessonId: 0,
      packageId: 0,
      transactionType: 0,
      classroomName: '',
      lessonName: '',
      staffName: '',
      approveType: 0,
      staff: null
    };
    this.activateRoute.params.subscribe((params) => {
      this.selectedEducatorId = parseInt(params['id']);
      this.getDoneLessonsByEducator();
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getDoneLessonsByEducator();
  }

  onPageProgram(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getDoneLessonsByEducator();
  }

  getDoneLessonsByEducator() {
    const request: PageRequestWithEducatorId = {
      educatorId: this.selectedEducatorId,
      pageRequest: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isAllItems: false,
      },
    };
    this.service.getDoneLessonsByEducator(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.lessonList = response.dynamicClass.items as CustomerLessonModel[];
        this.dataSource.data = this.lessonList;

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;

        if (this.lessonList.length > 0) {
          this.educatorName =
            this.lessonList[0].staff.name +
            ' ' +
            this.lessonList[0].staff.surname;
        }
        this.getByEducator();
      }
    });
  }

  getByEducator() {
    this.totalCost = 0;
    this.educatorCostService
      .getByEducator(this.selectedEducatorId)
      .subscribe((data) => {
        if (data.success) {
          this.costList = data.dynamicClass as EducatorCostModel[];
          console.log(this.costList);
          this.costList.forEach((element) => {
            this.totalCost += element.cost;
          });
          this.costDataSource = new MatTableDataSource(this.costList);
          this.costDataSource.paginator = this.paginatorCosts;
          this.costDataSource.sort = this.sortCosts;
        }
      });
  }

  getCostList() {
    this.educatorCostService
      .getByEducator(this.selectedEducatorId)
      .subscribe((data) => {
        if (data.success) {
          this.costList = data.dynamicClass as EducatorCostModel[];
          this.costDataSource = new MatTableDataSource(this.costList);
          this.costDataSource.paginator = this.paginatorCosts;
          this.costDataSource.sort = this.sortCosts;
        }
      });
  }

  openDialog(): void {
   
    const dialogRef = this.dialog.open(EducatorLessonCostModalComponent, {
      width: '600px',
      data: {
        cost: this.modalData.cost,
        description: this.modalData.description,
        educatorId: this.modalData.educatorId,
        staffName: this.modalData.staffName,
        classroomName: this.modalData.classroomName,
        lessonName: this.modalData.lessonName,
        lessonId: this.modalData.lessonId,
        cashBoxId: 0,
        currentDate: this.modalData.currentDate,
        packageId: this.modalData.packageId,
        transactionType: this.modalData.transactionType,
        id: this.modalData.id,
        staff: this.modalData.staff
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterCosts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.costDataSource.filter = filterValue.trim().toLowerCase();
    this.totalCost = 0;
    this.costDataSource.filteredData.forEach((element) => {
      this.totalCost += element.cost;
    });
    if (this.costDataSource.paginator) {
      this.costDataSource.paginator.firstPage();
    }
  }

  getCost(resource: any): void {
    let cost = 0;
    if(resource.staff?.salaryTypeId == 5){
      const item = resource.staff?.lessonEducators.filter((i: { lessonId: number; }) => i.lessonId == resource.lessonId);
      if(item.length > 0){
        cost = item[0].seansPrice;
      }else{
        alert('Ders için eğitmene seans ücreti eklenmemiş');
        return;
      }
    }else{
      cost = resource.cost;
    }
    this.modalData.educatorId = parseInt(resource.educatorId);
    this.modalData.cost = cost;
    this.modalData.description = '';
    this.modalData.staffName =
      resource.staff.name + ' ' + resource.staff.surname;
    this.modalData.classroomName = resource.classroom.classromName;
    this.modalData.lessonName =
      resource.lesson.lessonName + '/' + resource.artPackage.artPackageName;
    this.modalData.lessonId = resource.lessonId;
    this.modalData.packageId = resource.artPackageId;
    this.modalData.currentDate = resource.startDate;
    this.modalData.id = resource.id;
    this.modalData.approveType = resource.approveType;
    this.openDialog();
  }

  removeCostResult(id: number): void {
    const approve = confirm(
      'Bu hakedişi silmek üzeresiniz eğer silerseniz tüm kasa hareketlerinden de silinecektir ve dersin hakedişi alınmamış olarak kaydedilecektir, devam etmek istiyor musunuz?',
    );
    if (approve) this.removeCost(id);
  }

  removeCost(id: number): void {
    this.educatorCostService.removeCost(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
      }
    });
  }
}
