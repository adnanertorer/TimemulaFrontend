import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VSubCategory } from 'src/app/shared/model/v-sub-category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import {StepsService} from "../../../shared/services/steps.service";
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-create-sub-category',
  templateUrl: './create-sub-category.component.html',
  styleUrls: ['./create-sub-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateSubCategoryComponent implements OnInit {

  subCategory: SubCategoryModel;
  categories: CategoryModel[] = [];
  subCategories: VSubCategory[] = [];
  pageOfItems: Array<any>;
  pageOfSubItems: Array<any>;
  buttonText = Constants.Save;

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService) { }

  ngOnInit() {
    this.subCategory = {
      categoryId: 0,
      createdAt: new Date(),
      id: 0,
      name: ''
    };
    this.getCategories();
    this.getSubCategories();
  }

  getCategories() {
    this.categoryService.getList().subscribe((data) => {
      this.categories = data.dynamicClass as CategoryModel[];
      this.pageOfItems = this.categories;
    });
  }

  addSubCategory() {
    this.subCategoryService.add(this.subCategory).subscribe(data => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      }
    });
  }

  getSubCategories() {
    this.subCategoryService.getListAll().subscribe((data) => {
      this.subCategories = data.dynamicClass as VSubCategory[];
      this.pageOfSubItems = this.subCategories;
    }, (err)=>{
      console.log(err);
    })
  }

  add(): void {
    if (this.subCategory.id == 0) {
      this.subCategoryService.add(this.subCategory).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.subCategoryService.update(this.subCategory).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  remove(id: number): void {
    this.subCategoryService.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  onChangeSubPage(pageOfItems: any[]): void {
    this.pageOfSubItems = pageOfItems;
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  getDetailFromTable(resource: any): void {
    this.subCategory = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
