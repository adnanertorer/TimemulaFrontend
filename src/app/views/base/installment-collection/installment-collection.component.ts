import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { InstallmentDeptCollectionDialodData } from 'src/app/shared/model/installment-dept-collection-dialod-data';
import { InstallmentDeptCollectionModel } from 'src/app/shared/model/installment-dept-collection-model';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { DeptCollectionService } from 'src/app/shared/services/dept-collection.service';
declare let alertify: any;

@Component({
  selector: 'app-installment-collection',
  templateUrl: './installment-collection.component.html',
  styleUrls: ['./installment-collection.component.css']
})
export class InstallmentCollectionComponent implements OnInit {

  deptCollection: InstallmentDeptCollectionModel;
  cashBoxList: CashboxModel[] = [];
  constructor(public dialogRef: MatDialogRef<InstallmentCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InstallmentDeptCollectionDialodData, private cashBoxService: CashboxService, 
     private service: DeptCollectionService, private router: Router) { 
      console.log(data);
     }

  ngOnInit() {
    this.deptCollection = {
      // accountingTransactionId: 0,
       collectionAmount: this.data.deptCollection.collectionAmount,
       createdAt: new Date,
       createdBy: 0,
       id: 0,
       cashBoxId: 0,
       description: '',
       customerId: 0,
       installmentDetailId: this.data.deptCollection.installmentDetailId
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
     this.deptCollection.id = this.data.deptCollection.id;
     this.deptCollection.cashBoxId = parseInt(this.data.deptCollection.cashBoxId.toString());
     this.deptCollection.collectionAmount = this.data.deptCollection.collectionAmount;
     if (this.data.deptCollection.id == 0) {
       this.service.addInstallment(this.data.deptCollection).subscribe((data) => {
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
       this.service.update(this.data.deptCollection).subscribe((data) => {
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
