import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/shared/model/customer';
import { ProductModel } from 'src/app/shared/model/product-model';
import { SupplierModel } from 'src/app/shared/model/supplier-model';
import { VWarehouseModel } from 'src/app/shared/model/v-warehouse-model';
import { WarehouseModel } from 'src/app/shared/model/warehouse-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { WarehouseService } from 'src/app/shared/services/warehouse.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css'],
})
export class ProductStockComponent implements OnInit {
  buttonText = Constants.Save;
  warehosue: WarehouseModel;
  stockList: VWarehouseModel[] = [];
  products: ProductModel[] = [];
  product: ProductModel = null;
  customers: Customer[] = [];
  suppliers: SupplierModel[] = [];

  isCustomer: boolean = false;
  isSupplier: boolean = false;
  unitPrice: number = 0;
  finalPrice: number = 0;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  displayedColumns: string[] = [
    'name',
    'unitPrice',
    'amount',
    'discount',
    'cost',
    'createdAt',
    'transactionType',
    'id',
  ];

  dataSource = new MatTableDataSource<VWarehouseModel>();
  @ViewChild('productPaginator') paginator: MatPaginator;
  @ViewChild('productSort') sort: MatSort;

  constructor(
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private customerService: CustomerService,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    this.warehosue = {
      amount: 0,
      cost: 0,
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      prType: 0,
      productId: 0,
      currentAccount: 0,
      discount: 0,
      unitPrice: 0,
    };
    this.getProductList();
    this.getList();
  }
  productOnChange(source) {
    this.productService.getDetails(parseInt(source)).subscribe((data) => {
      if (data.success) {
        this.product = data.dynamicClass as ProductModel;
        this.unitPrice = this.product.price;
        this.warehosue.unitPrice = this.product.price;
      }
    });
  }

  onAmountChange(amountValue: string): void {
    const amount = parseInt(amountValue);
    this.warehosue.amount = amount;
    this.warehosue.cost = this.warehosue.amount * this.unitPrice;
    const discountValue = (this.warehosue.discount * this.warehosue.cost) / 100;
    this.warehosue.cost = this.warehosue.cost - discountValue;
    // this.finalPrice = this.warehosue.cost;
  }

  onDiscountChange(discountValue: string): void {
    if (!Number.isNaN(parseInt(discountValue))) {
      this.warehosue.cost = this.warehosue.amount * this.unitPrice;
      const discount = (parseInt(discountValue) * this.warehosue.cost) / 100;
      this.warehosue.cost = this.warehosue.cost - discount;
    } else {
      this.warehosue.cost = this.warehosue.amount * this.unitPrice;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  typeOnChange(id) {
    if (parseInt(id) == 4) {
      this.isCustomer = false;
      this.isSupplier = true;
      this.warehosue.currentAccount = 0;
      this.getSupplierList();
    }
    if (parseInt(id) == 2) {
      this.isCustomer = true;
      this.isSupplier = false;
      this.warehosue.currentAccount = 0;
      this.getCustomerList();
    }
  }

  getProductList() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 10000,
      isAllItems: true,
    };
    this.productService.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<ProductModel>;
      this.products = response.dynamicClass.items as ProductModel[];
    });
  }

  getCustomerList() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: false,
    };
    this.customerService.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<Customer>;
      this.customers = response.dynamicClass.items;
    });
  }

  getSupplierList() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 10000,
      isAllItems: true,
    };
    this.supplierService.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<SupplierModel>;
      this.suppliers = response.dynamicClass.items;
    });
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }
  getDetailFromTable(resource: any): void {
    this.warehosue = resource;
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
    if (this.warehosue.id == 0) {
      this.warehouseService.add(this.warehosue).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.warehouseService.update(this.warehosue).subscribe(
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

  getList(): void {
    const request: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.warehouseService.getList(request).subscribe((data) => {
      const response = data as PaginateResponse<any>;
      this.stockList = response.dynamicClass.items as VWarehouseModel[];

      this.dataSource.data = this.stockList;
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.length = this.total;
      this.dataSource.sort = this.sort;
    });
  }

  remove(id: number): void {
    this.warehouseService.remove(id).subscribe((data) => {
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
