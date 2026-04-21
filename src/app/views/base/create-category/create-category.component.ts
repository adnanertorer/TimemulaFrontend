import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { CategoryService } from 'src/app/shared/services/category.service';
import {StepsService} from "../../../shared/services/steps.service";
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCategoryComponent implements OnInit {

  category: CategoryModel;
  categories: CategoryModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.category = {
      categoryName: '',
      createdAt: new Date(),
      createdBy: 0,
      id: 0
    };
    this.getList();
  }

  getList() {
    this.service.getList().subscribe((data) => {
      this.categories = data.dynamicClass as CategoryModel[];
      this.pageOfItems = this.categories;
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.category = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.category.id == 0) {
      this.service.add(this.category).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.category).subscribe((data) => {
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
