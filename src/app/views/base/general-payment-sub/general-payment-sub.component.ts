import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { PaymentDialogData } from 'src/app/shared/model/payment-dialog-data';
import { PaymentModel } from 'src/app/shared/model/payment-model';
import { SupplierModel } from 'src/app/shared/model/supplier-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
declare let alertify: any;

@Component({
  selector: 'app-general-payment-sub',
  templateUrl: './general-payment-sub.component.html',
  styleUrls: ['./general-payment-sub.component.css']
})
export class GeneralPaymentSubComponent implements OnInit {

  payment: PaymentModel;
  cashBoxList: CashboxModel[] = [];
  supliers: SupplierModel[] = [];
  tempDataList: any[];
  constructor(public dialogRef: MatDialogRef<GeneralPaymentSubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData, private cashBoxService: CashboxService, 
     private service: PaymentService, private supplierService: SupplierService, private router: Router) { 
       console.log(data);
     }

  ngOnInit() {
    this.payment = {
     // accountingTransactionId: 0,
      paymentAmount: 0,
      createdAt: new Date,
      createdBy: 0,
      id: 0,
      cashBoxId: 0,
      description: '',
      supplierId: 0,
      changedAt: null,
      changedBy: null
    }
    this.getCashBoxes();
    this.getSuppliers();
  }

  getSuppliers() {
      const pageRequest: PageRequest = {
        pageIndex: 0,
        pageSize: 10000,
        isAllItems: true,
      };
      this.supplierService.getList(pageRequest).subscribe((data) => {
        if (data.success) {
          const response = data as PaginateResponse<SupplierModel>;
          this.supliers = response.dynamicClass.items;
          this.tempDataList = [];
          this.supliers.forEach((element) => {
            const tempData = {
              id: element.id,
              name: element.companyName,
            };
            this.tempDataList.push(tempData);
          });
        }
      });
    }

  getCashBoxes(){
    this.cashBoxService.getList().subscribe((data)=>{
      if(data.success){
        this.cashBoxList = data.dynamicClass as CashboxModel[];
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['cari-hesaplar/hesap-hareketleri.html']);
  }

  add(): void {
    this.payment.supplierId = this.data.paymentModel.supplierId;
    this.payment.id = this.data.paymentModel.id;
    this.payment.cashBoxId = parseInt(this.data.paymentModel.cashBoxId.toString());
    this.payment.paymentAmount = this.data.paymentModel.paymentAmount;
    if (this.data.paymentModel.id == 0) {
      this.service.add(this.data.paymentModel).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
          this.onNoClick();
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.data.paymentModel).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
          this.onNoClick();
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }


}
