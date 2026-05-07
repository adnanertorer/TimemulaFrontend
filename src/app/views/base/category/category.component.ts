import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app';
import { CategoryModel } from 'src/app/shared/model/category-model';
import { CategoryService } from 'src/app/shared/services/category.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category: CategoryModel | undefined;
  categories: CategoryModel[] = [];
  pageOfItems: Array<any> | undefined;
  buttonText = Constants.Save;

  constructor(
    private service: CategoryService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.category = {
      categoryName: '',
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
    };

    this.getList();
  }

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }

  getList() {
    this.service.getList().subscribe((data) => {
      this.categories = data.dynamicClass as CategoryModel[];
      this.pageOfItems = this.categories;
    });
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
      behavior: 'smooth',
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.category && this.category.id == 0) {
      this.service.add(this.category).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        },
        (err) => {
          alertify.error(err, 2);
        },
      );
    } else if (this.category) {
      this.service.update(this.category).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        },
        (err) => {
          alertify.error(err, 2);
        },
      );
    }
  }

  remove(id: number): void {
    const approve = confirm(
      'Kategori silmek üzeresiniz, devam etmek istiyor musunuz?',
    );
    if (approve) this.approveRemove(id);
  }

  approveRemove = (id: number) => {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  };
}
