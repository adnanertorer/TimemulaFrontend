import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VEducatorCost } from 'src/app/shared/model/v-educator-cost';
import { LessonWithCategoriesPaginationRequest } from 'src/app/shared/requests/lesson_with_categories_pagination_request';
import { PageRequestWithEducatorLessonFilter } from 'src/app/shared/requests/page-request-with-educator-lesson-filter';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PageRequestLessonById } from 'src/app/shared/requests/page_request_lesson_by_id';
import { SubCategoryWithCategoryIdPaginationRequest } from 'src/app/shared/requests/subcategory_with_categoryid_pagination';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';

@Component({
  selector: 'app-educator-price-list',
  templateUrl: './educator-price-list.component.html',
  styleUrls: ['./educator-price-list.component.css'],
})
export class EducatorPriceListComponent implements OnInit {
  costList: VEducatorCost[] = [];
  educators: StaffModel[] = [];
  cashBoxes: CashboxModel[] = [];
  packages: ArtPackageModel[] = [];
  lessons: LessonModel[] = [];
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  costDisplayColums: string[] = [
    'name',
    'cost',
    'lessonName',
    'cashBoxName',
    'createdAt',
    'description',
    'id',
  ];

  cashBoxId: number = 0;
  educatorId: number = 0;
  lessonId: number = 0;
  packageId: number = 0;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  startDate: Date = null;
  endDate: Date = null;

  public minDate: Date = new Date(1900, 1, 1);
  public maxDate: Date = new Date(2999, 12, 31);

  costDataSource = new MatTableDataSource<VEducatorCost>();

  @ViewChild('paginatorCosts') paginator: MatPaginator;
  @ViewChild('costSort') sort: MatSort;

  totalCost: number = 0;

  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;

  constructor(
    private service: ActualCustomerLessonService,
    private educatorCostService: EducatorCostService,
    private staffService: StaffService,
    private cashBoxService: CashboxService,
    private packageService: ArtPackageService,
    private lessonService: LessonService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
  ) {}

  ngOnInit() {
    this.getList();
    this.getEducators();
    this.getCashBoxes();
    this.getCategories();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  getList() {
    const request: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.educatorCostService.getList(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.costList = response.dynamicClass.items as VEducatorCost[];
        this.costList.forEach((element) => {
          this.totalCost += element.cost;
        });

        this.costDataSource.data = this.costList;
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  getEducators() {
    this.staffService.getTeachers().subscribe((data) => {
      if (data.success) {
        this.educators = data.dynamicClass as StaffModel[];
      }
    });
  }

  getCashBoxes() {
    this.cashBoxService.getList().subscribe((data) => {
      if (data.success) {
        this.cashBoxes = data.dynamicClass as CashboxModel[];
      }
    });
  }

  getCategories() {
    this.categoryService.getList().subscribe((data) => {
      if (data.success) {
        this.categories = data.dynamicClass as CategoryModel[];
      }
    });
  }

  getPackages(id: number) {
    const pageRequest: PageRequestLessonById = {
      lessonId: id,
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: true,
      },
    };
    this.packageService.getListByLesson(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.packages = response.dynamicClass.items as ArtPackageModel[];
      }
    });
  }

  lessonOnChange(id) {
    this.getPackages(parseInt(id));
  }

  categoryOnChange(id) {
    this.selectedCategoryId = parseInt(id);
    this.getSubCategories(this.selectedCategoryId);
  }

  subCategoryOnChange(id) {
    this.selectedSubCategoryId = parseInt(id);
    this.getLessons(this.selectedCategoryId, this.selectedSubCategoryId);
  }

  getSubCategories(categoryId: number) {
    const request: SubCategoryWithCategoryIdPaginationRequest = {
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: false,
      },
      categoryId: categoryId,
    };
    this.subCategoryService.getList(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<SubCategoryModel>;
        this.subCategories = response.dynamicClass.items as SubCategoryModel[];
      }
    });
  }

  getLessons(categoryId: number, subCategoryId: number) {
    const pageRequest: LessonWithCategoriesPaginationRequest = {
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: false,
      },
    };
    this.lessonService.getByCategory(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.lessons = response.dynamicClass.items as LessonModel[];
      }
    });
  }

  startDateChange(date: any) {
    this.startDate = date;
  }

  endDateChange(date: any) {
    this.endDate = date;
  }

  getWithFilter() {
    const request: PageRequestWithEducatorLessonFilter = {
      pageRequest: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        isAllItems: false,
      },
      filter: {
        cashBoxId: this.cashBoxId,
        educatorId: this.educatorId,
        lessonId: this.lessonId,
        categoryId: this.selectedCategoryId,
        subCategoryId: this.selectedSubCategoryId,
        packageId: this.packageId,
        startDate: this.startDate,
        endDate: this.endDate,
      },
    };
    this.educatorCostService.getListByFilter(request).subscribe((data) => {
      if (data.success) {
        this.totalCost = 0;
        const response = data as PaginateResponse<any>;
        this.costList = response.dynamicClass.items as VEducatorCost[];
        this.costList.forEach((element) => {
          this.totalCost += element.cost;
        });
        this.costDataSource.data = this.costList;

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
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
}
