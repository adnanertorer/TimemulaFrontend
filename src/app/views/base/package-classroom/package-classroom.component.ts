import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { ClassroomModel } from 'src/app/shared/model/classroom-model';
import { PackageClassroomModel } from 'src/app/shared/model/package-classroom-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VLessons } from 'src/app/shared/model/v-lessons';
import { LessonWithCategoriesPaginationRequest } from 'src/app/shared/requests/lesson_with_categories_pagination_request';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { SubCategoryWithCategoryIdPaginationRequest } from 'src/app/shared/requests/subcategory_with_categoryid_pagination';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PackageClassroomService } from 'src/app/shared/services/classroom-package.service';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { LessonService } from 'src/app/shared/services/lesson.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import Constants from 'src/app/shared/tools/constants';
import { participantEnum } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-package-classroom',
  templateUrl: './package-classroom.component.html',
  styleUrls: ['./package-classroom.component.css'],
})
export class PackageClassroomComponent implements OnInit {
  packageClassroom: PackageClassroomModel;
  list: PackageClassroomModel[] = [];
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  artPackages: ArtPackageModel[] = [];
  classrooms: ClassroomModel[] = [];
  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;
  buttonText = Constants.Save;
  closedGroup: number = participantEnum.closedGroup;
  lessons: VLessons[] = [];

  @ViewChild('paginator') paginator: MatPaginator;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  constructor(
    private service: PackageClassroomService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private classroomService: ClassroomService,
    private lessonService: LessonService,
  ) {}

  ngOnInit() {
    this.packageClassroom = {
      classroomId: 0,
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      maxCapacity: 0,
      minCapacity: 0,
      priority: 0,
      categoryId: 0,
      subCategoryId: 0,
      lessonId: 0,
    };

    this.getList();
    this.getClassrooms();
    this.getCategories();
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
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as PackageClassroomModel[];
        
         this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    });
  }

  categoryOnChange(id) {
    this.selectedCategoryId = parseInt(id);
    this.getSubCategories(this.selectedCategoryId);
  }

  subCategoryOnChange(id) {
    this.selectedSubCategoryId = parseInt(id);
    this.getLessons(this.selectedCategoryId, this.selectedSubCategoryId);
  }

  getClassrooms() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: false,
    };
    this.classroomService.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<ClassroomModel>;
        this.classrooms = response.dynamicClass.items as ClassroomModel[];
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
        this.lessons = response.dynamicClass.items as VLessons[];
      }
    });
  }


  getDetailFromTable(resource: any): void {
    console.log(resource);
    this.packageClassroom = resource;
    this.packageClassroom.categoryId = resource.lesson.category.id;
    const request: SubCategoryWithCategoryIdPaginationRequest = {
      pageRequest: {
        pageIndex: 0,
        pageSize: 1000,
        isAllItems: false,
      },
      categoryId: this.packageClassroom.categoryId,
    };
    this.subCategoryService.getList(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<SubCategoryModel>;
        this.subCategories = response.dynamicClass.items as SubCategoryModel[];
        this.packageClassroom.subCategoryId = resource.lesson.subCategory.id;
        const pageRequest: LessonWithCategoriesPaginationRequest = {
          categoryId: this.packageClassroom.categoryId,
          subCategoryId: this.packageClassroom.subCategoryId,
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
            this.packageClassroom.lessonId = resource.lesson.id;
          }
        });
      }
    });

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
    this.packageClassroom.classroomId = parseInt(
      this.packageClassroom.classroomId.toString(),
    );
    this.packageClassroom.lessonId = parseInt(
      this.packageClassroom.lessonId.toString(),
    );
    this.packageClassroom.maxCapacity = parseInt(
      this.packageClassroom.maxCapacity.toString(),
    );
    this.packageClassroom.minCapacity = parseInt(
      this.packageClassroom.minCapacity.toString(),
    );
    this.packageClassroom.priority = parseInt(
      this.packageClassroom.priority.toString(),
    );
    if (this.packageClassroom.id == 0) {
      this.service.add(this.packageClassroom).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      });
    } else {
      this.service.update(this.packageClassroom).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      });
    }
  }

  remove(id: number): void {
    const approve = confirm(
      'Ders/Sınıf silmek üzeresiniz, devam etmek istiyor musunuz?',
    );
    if (approve) {
      this.service.remove(id).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      });
    }
  }
}
