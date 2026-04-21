import { HttpClient, HttpEventType } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from 'src/app/shared/model/product-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ProductService } from 'src/app/shared/services/product.service';
import Constants from 'src/app/shared/tools/constants';
import { environment } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  buttonText = Constants.Save;
  product: ProductModel;
  productList: ProductModel[] = [];
  public message: String;
  public progress: number;
  filesTemp: any;

  private readonly apiUrl = `${environment.apiUrl}`;
  private readonly mainUrl = `${environment.mainUrl}`;

  @Output() public onUploadFinished = new EventEmitter();

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  displayedColumns: string[] = [
    'name',
    'price',
    'createdAt',
    'isActive',
    'description',
    'id',
  ];

  dataSource = new MatTableDataSource<ProductModel>([]);

  @ViewChild('productPaginator') paginator: MatPaginator;
  @ViewChild('productSort') sort: MatSort;

  constructor(
    private service: ProductService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.product = {
      createdAt: new Date(),
      createdBy: 0,
      description: '',
      id: 0,
      isActive: true,
      name: '',
      price: 0,
      productPhoto: '',
    };
    this.getList();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  getDetailFromTable(resource: any): void {
    this.product = resource;
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

  getDetails(row: any): void {
    this.product = row;
    this.buttonText = Constants.Update;
  }

  add(): void {
    if (this.product.id == 0) {
      this.service.add(this.product).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.product).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            this.buttonText = Constants.Save;
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    }
  }

  getList(): void {
    const reqeust: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getList(reqeust).subscribe((data) => {
      const response = data as PaginateResponse<any>;
      this.productList = response.dynamicClass.items as ProductModel[];
      this.dataSource.data = this.productList;

      this.paginator.pageIndex = this.pageIndex;
      this.paginator.length = this.total;

      this.dataSource.sort = this.sort;
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

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (
      ext.toLowerCase() == 'png' ||
      ext.toLowerCase() == 'jpg' ||
      ext.toLowerCase() == 'jpeg'
    ) {
      return true;
    } else {
      return false;
    }
  }

  public uploadFile = (files) => {
    if (files.lenght === 0) {
      return;
    }
    this.filesTemp = files;
    let fileToUpload = <File>this.filesTemp[0];

    if (!this.validateFile(fileToUpload.name)) {
      alert('Lütfen fotoğrafınızı jpg, jpeg ya da png formatında yükleyiniz.');
      return false;
    }

    const formData = new FormData();
    formData.append('productPhoto', fileToUpload.name);
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('isActive', this.product.isActive ? 'true' : 'false');
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('createdBy', '0');
    formData.append('createdAt', new Date().toISOString());
    this.http
      .post(`${this.apiUrl}/Product/Add`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Yükleme tamamlandı';
          this.onUploadFinished.emit(event.body);
        }
      });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
