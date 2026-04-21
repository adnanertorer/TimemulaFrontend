import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { ParticipantModel } from 'src/app/shared/model/participant-model';
import { ParticipationModel } from 'src/app/shared/model/participation-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VArtPackageModel } from 'src/app/shared/model/v-art-package-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { LessonWithCategoriesPaginationRequest } from 'src/app/shared/requests/lesson_with_categories_pagination_request';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { SubCategoryWithCategoryIdPaginationRequest } from 'src/app/shared/requests/subcategory_with_categoryid_pagination';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ArtPackageService } from 'src/app/shared/services/art-package.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { ParticipantTypeService } from 'src/app/shared/services/participant-type.service';
import { ParticipantService } from 'src/app/shared/services/participant.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import Constants from 'src/app/shared/tools/constants';
import { participantEnum } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-art-package',
  templateUrl: './art-package.component.html',
  styleUrls: ['./art-package.component.css'],
})
export class ArtPackageComponent implements OnInit {
  displayedColumns: string[] = [
    'categoryName',
    'subCategoryName',
    'lessonName',
    'artPackageName',
    'seanceCount',
    'duration',
    'unitPrice',
    'seancePrice',
    'discount',
    'participantTypeName',
    'participantName',
    'isActive',
    'description',
    'id',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  artPackage: ArtPackageModel;
  artPackages: VArtPackageModel[] = [];
  subCategories: SubCategoryModel[] = [];
  categories: CategoryModel[] = [];
  participantTypes: ParticipationModel[] = [];
  participants: ParticipantModel[] = [];
  lessons: VLessons[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  isGroup: boolean = false;
  pageIndex: number = 0;
  pageSize: number = 10;
  total: number = 0;

  constructor(
    private service: ArtPackageService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private participantTypeService: ParticipantTypeService,
    private participantService: ParticipantService,
    private lessonService: LessonService,
  ) {}

  ngOnInit() {
    this.artPackage = {
      artPackageName: '',
      categoryId: 0,
      createdAt: new Date(),
      createdBy: 0,
      description: '',
      discount: 0,
      id: 0,
      isActive: true,
      seanceCount: 0,
      seancePrice: 0,
      unitPrice: 0,
      participantTypeId: 0,
      subCategoryId: 0,
      participantId: 0,
      maxCapacity: 0,
      lessonId: 0,
      duration: 0,
    };

    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };

    this.service.getListAll(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.artPackages = response.dynamicClass.items as any[];
        this.dataSource.data = this.artPackages;
        this.total = response.dynamicClass.count;
        this.pageIndex = response.dynamicClass.index;

        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
    this.getCategories();
    this.getParticipantTypes();
    this.getParticipants();
  }

  onChangeSeancePrice(event: any): void {
    const seancePrice = (event.target as HTMLInputElement).value;
    var price = parseFloat(seancePrice) * this.artPackage.seanceCount;
    this.artPackage.seancePrice = price;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList() {
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getListAll(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.artPackages = response.dynamicClass.items as VArtPackageModel[];
        this.dataSource.data = this.artPackages;
        this.total = response.dynamicClass.count;
        this.pageIndex = response.dynamicClass.index;
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  categoryOnChange(id) {
    this.getSubCategories(this.artPackage.categoryId);
  }

  subCategoryOnChange(id) {
    this.getLessons(this.artPackage.categoryId, this.artPackage.subCategoryId);
  }

  participantOnChange(id) {
    if (id == participantEnum.group) {
      this.isGroup = true;
    } else if (id == participantEnum.closedGroup) {
    } else {
      this.isGroup = false;
    }
  }

  getSubCategories(id: number) {
    const request: SubCategoryWithCategoryIdPaginationRequest = {
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: false,
      },
      categoryId: id,
    };

    this.subCategoryService.getList(request).subscribe(
      (data) => {
        const response = data as PaginateResponse<SubCategoryModel>;
        this.subCategories = response.dynamicClass.items as SubCategoryModel[];
      },
      (err) => {
        console.log(err);
      },
    );
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
        this.lessons = response.dynamicClass.items as VLessons[];
      }
    });
  }

  getCategories() {
    this.categoryService.getList().subscribe(
      (data) => {
        this.categories = data.dynamicClass as CategoryModel[];
      },
      (err) => {
        console.log(err);
      },
    );
  }

  getParticipantTypes() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: false,
    };
    this.participantTypeService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<ParticipationModel>;
        this.participantTypes = response.dynamicClass
          .items as ParticipationModel[];
      }
    });
  }

  getParticipants() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: false,
    };

    this.participantService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<ParticipantModel>;
        this.participants = response.dynamicClass.items as ParticipantModel[];
      }
    });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    const id = parseInt(resource);
    this.ngOnInit();
    this.service.getDetails(id).subscribe((data) => {
      if (data.success) {
        this.artPackage = data.dynamicClass as ArtPackageModel;
        const request: SubCategoryWithCategoryIdPaginationRequest = {
          pageRequest: {
            pageIndex: 0,
            pageSize: 1000,
            isAllItems: false,
          },
          categoryId: this.artPackage.categoryId,
        };
        this.subCategoryService.getList(request).subscribe(
          (data) => {
            const response = data as PaginateResponse<SubCategoryModel>;
            this.subCategories = response.dynamicClass
              .items as SubCategoryModel[];
            this.artPackage.subCategoryId = this.artPackage.subCategoryId;
            const pageRequest: LessonWithCategoriesPaginationRequest = {
              categoryId: this.artPackage.categoryId,
              subCategoryId: this.artPackage.subCategoryId,
              pageRequest: {
                pageIndex: 0,
                pageSize: 1000,
                isAllItems: false,
              },
            };
            this.lessonService.getByCategory(pageRequest).subscribe((data) => {
              if (data.success) {
                const response = data as PaginateResponse<any>;
                this.lessons = response.dynamicClass.items as VLessons[];
                this.artPackage.lessonId = this.artPackage.lessonId;
                this.buttonText = Constants.Update;
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }
            });
          },
          (err) => {
            console.log(err);
          },
        );
      }
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    this.artPackage.categoryId = parseInt(
      this.artPackage.categoryId.toString(),
    );
    this.artPackage.subCategoryId = parseInt(
      this.artPackage.subCategoryId.toString(),
    );
    this.artPackage.discount = this.artPackage.discount
      ? parseFloat(this.artPackage.discount.toString())
      : 0;
    this.artPackage.participantId = this.artPackage.participantId
      ? parseInt(this.artPackage.participantId.toString(), 10)
      : 3;
    this.artPackage.participantTypeId = this.artPackage.participantTypeId
      ? parseInt(this.artPackage.participantTypeId.toString(), 10)
      : 3;
    this.artPackage.seanceCount = this.artPackage.seanceCount;
    this.artPackage.seancePrice = this.artPackage.seancePrice ?? 0;
    this.artPackage.unitPrice = this.artPackage.unitPrice ?? 0;
    this.artPackage.duration = this.artPackage.duration ?? 45;
    this.artPackage.lessonId = this.artPackage.lessonId
      ? parseInt(this.artPackage.lessonId.toString(), 10)
      : 0;
    if (this.artPackage.id == 0) {
      this.service.add(this.artPackage).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.artPackage).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    }
  }

  remove(id: number): void {
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
