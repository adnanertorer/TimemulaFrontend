import { Component, OnInit } from '@angular/core';
import { ArtPackageModel } from 'src/app/shared/model/art-package-model';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { ClassroomModel } from 'src/app/shared/model/classroom-model';
import { LessonModel } from 'src/app/shared/model/lesson-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VClassroomPackageModel } from 'src/app/shared/model/v-classroom-package-model';
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

export interface ClassroomLessonTemp {
  maxCapacity: number;
  minCapacity: number;
  categoryId: number;
  subCategoryId: number;
  lessonId: number;
  id: number;
}

export interface CreateClassroomForLesson {
  classroom: ClassroomModel;
  lesson: ClassroomLessonTemp;
  classroomId: number;
  id: number;
  lessonId: number;
  maxCapacity: number;
  minCapacity: number;
}


@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent implements OnInit {

  list: VClassroomPackageModel[] = [];
  categories: CategoryModel[] = [];
  subCategories: SubCategoryModel[] = [];
  artPackages: ArtPackageModel[] = [];
  classrooms: ClassroomModel[] = [];
  classroom: ClassroomModel;
  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  selectedLessonId: number = 0;

  createClassroomForLesson: CreateClassroomForLesson;

  closedGroup: number = participantEnum.closedGroup;
  lessons: LessonModel[] = [];

  constructor(private service: PackageClassroomService,
    private categoryService: CategoryService, private subCategoryService: SubCategoryService,
    private classroomService: ClassroomService, private lessonService: LessonService) { }

  ngOnInit() {
    this.createClassroomForLesson = {
      classroom: {
        id: 0,
        classromName: "",
        createdBy: 0,
        quta: 0
      },
      lesson: {
        maxCapacity: 0,
        minCapacity: 0,
        categoryId: 0,
        subCategoryId: 0,
        lessonId: 0,
        id: 0
      },
      classroomId: 0,
      id: 0,
      lessonId: 0,
      maxCapacity: 0,
      minCapacity: 0
    };

    this.getList();
    this.getClassrooms();
    this.getCategories();
  }

  getList() {
     const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: true,
    };
    this.service.getList(pageRequest).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<any>;
        this.list = response.dynamicClass.items as VClassroomPackageModel[];
      }
    })
  }

  categoryOnChange(id) {
    this.selectedCategoryId = parseInt(id);
    this.getSubCategories(this.selectedCategoryId);
  }

  subCategoryOnChange(id) {
    this.selectedSubCategoryId = parseInt(id);
    this.getLessons(this.selectedCategoryId, this.selectedSubCategoryId);
  }

  lessonOnChange(id){
    this.selectedLessonId = parseInt(id);
    console.log(this.selectedLessonId);
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
    })
  }

  getCategories() {
    this.categoryService.getList().subscribe((data) => {
      if (data.success) {
        this.categories = data.dynamicClass as CategoryModel[];
      }
    })
  }

  getSubCategories(categoryId: number) {
    const request: SubCategoryWithCategoryIdPaginationRequest = {
          pageRequest: {
            pageIndex: 0,
            pageSize: 1000,
            isAllItems: false,
          },
          categoryId:categoryId
        };
    this.subCategoryService.getList(request).subscribe((data) => {
      if (data.success) {
        const response = data as PaginateResponse<SubCategoryModel>;
        this.subCategories = response.dynamicClass.items as SubCategoryModel[];
      }
    })
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
        console.log(this.lessons);
      }
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.categoryService.getList().subscribe((data) => {
      if (data.success) {
        this.categories = data.dynamicClass as CategoryModel[];
        const request: SubCategoryWithCategoryIdPaginationRequest = {
          pageRequest: {
            pageIndex: 0,
            pageSize: 1000,
            isAllItems: false,
          },
          categoryId: resource.lesson.categoryId
        };

        this.subCategoryService.getList(request).subscribe((data) => {
          if (data.success) {
            const response = data as PaginateResponse<SubCategoryModel>;
            this.subCategories = response.dynamicClass
              .items as SubCategoryModel[];
              const pageRequest: LessonWithCategoriesPaginationRequest = {
          categoryId: resource.lesson.categoryId,
          subCategoryId: resource.lesson.subCategoryId,
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
                console.log(resource);
                this.createClassroomForLesson = resource;
                console.log(this.createClassroomForLesson);
                this.buttonText = Constants.Update;
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
              }
            })
          }
        })
      }
    })
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    this.createClassroomForLesson.classroom.id = parseInt(this.createClassroomForLesson.classroom.id.toString());
    this.createClassroomForLesson.lesson.lessonId = this.selectedLessonId;
    this.createClassroomForLesson.lesson.maxCapacity = parseInt(this.createClassroomForLesson.lesson.maxCapacity.toString());
    this.createClassroomForLesson.lesson.minCapacity = parseInt(this.createClassroomForLesson.lesson.minCapacity.toString());
    this.service.addSetup(this.createClassroomForLesson).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      }
    }, (err) => {
      alertify.error(err, 2);
    });
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
