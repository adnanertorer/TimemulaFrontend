import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { PaymentDialogData } from 'src/app/shared/model/payment-dialog-data';
import { PaymentModel } from 'src/app/shared/model/payment-model';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
declare let alertify: any;

@Component({
  selector: 'app-payment-sub',
  templateUrl: './payment-sub.component.html',
  styleUrls: ['./payment-sub.component.css']
})
export class PaymentSubComponent implements OnInit {

  payment: PaymentModel;
  cashBoxList: CashboxModel[] = [];
  constructor(public dialogRef: MatDialogRef<PaymentSubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData, private cashBoxService: CashboxService, 
     private service: PaymentService, private router: Router) { 
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
