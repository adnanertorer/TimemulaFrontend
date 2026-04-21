import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { SubCategoryModel } from 'src/app/shared/model/sub-category-model';
import { VSubCategory } from 'src/app/shared/model/v-sub-category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  subCategory: SubCategoryModel;
  subCategories: SubCategoryModel[] = [];
  categories: CategoryModel[] = [];
  categoryId: number;
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  constructor(private service: SubCategoryService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.subCategory = {
      categoryId: 0,
      createdAt: new Date(),
      id: 0,
      name: ''
    };

    this.getCategoryList();
    this.getList();
  }

  getCategoryList() {
    this.categoryService.getList().subscribe((data) => {
      this.categories = data.dynamicClass as CategoryModel[];
    })
  }

  getList() {
    this.service.getListAll().subscribe((data) => {
      this.subCategories = data.dynamicClass as SubCategoryModel[];
      this.pageOfItems = this.subCategories;
    }, (err) => {
      console.log(err);
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    const id = parseInt(resource.id);
    this.service.getDetails(id).subscribe((data) => {
      if (data.success) {
        this.subCategory = data.dynamicClass as SubCategoryModel;
        this.buttonText = Constants.Update;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.subCategory.id == 0) {
      this.service.add(this.subCategory).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.subCategory).subscribe((data) => {
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
    const approve = confirm('Alt Kategori silmek üzeresiniz, devam etmek istiyor musunuz?');
    if (approve) {
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

}
