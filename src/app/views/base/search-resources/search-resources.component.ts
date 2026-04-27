import { Component, OnInit } from '@angular/core';
import { SearchResourceModel } from 'src/app/shared/model/search-resource-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { SearchResourceService } from 'src/app/shared/services/search-resource.service';
declare let alertify: any;

@Component({
  selector: 'app-search-resources',
  templateUrl: './search-resources.component.html',
  styleUrls: ['./search-resources.component.css']
})
export class SearchResourcesComponent implements OnInit {

  searchResource: SearchResourceModel | undefined;
  list: SearchResourceModel[] = [];
  pageOfItems: Array<any> | undefined;
  buttonText = 'Kaydet';
  constructor(private service: SearchResourceService) { }

  ngOnInit() {
    this.searchResource = {
      createdBy: 0,
      id: 0,
      searchResourceName: ''
    };
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.searchResource = resource;
    this.buttonText = 'Güncelle';
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = 'Kaydet';
    this.ngOnInit();
  }

  add(): void {
    if (this.searchResource!.id == 0) {
      this.service.add(this.searchResource!).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.searchResource!).subscribe((data) => {
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

  getList(): void {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 50,
      isAllItems: false
    };
    this.service.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<SearchResourceModel>;
      this.list = response.dynamicClass.items;
      this.pageOfItems = this.list;
    })
  }

  remove(id: number): void {
    const approve = confirm('Arama motoru silmek üzeresiniz, devam etmek istiyor musunuz?');
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
