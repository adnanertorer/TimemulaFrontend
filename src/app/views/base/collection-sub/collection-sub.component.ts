import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { DeptCollectionDialogData } from 'src/app/shared/model/dept-collection-dialog-data';
import { DeptCollectionModel } from 'src/app/shared/model/dept-collection-model';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { DeptCollectionService } from 'src/app/shared/services/dept-collection.service';
declare let alertify: any;

@Component({
  selector: 'app-collection-sub',
  templateUrl: './collection-sub.component.html',
  styleUrls: ['./collection-sub.component.css']
})
export class CollectionSubComponent implements OnInit {

  deptCollection: DeptCollectionModel;
  cashBoxList: CashboxModel[] = [];
  constructor(public dialogRef: MatDialogRef<CollectionSubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeptCollectionDialogData, private cashBoxService: CashboxService, 
     private service: DeptCollectionService, private router: Router) { 
       console.log(data);
     }

  ngOnInit() {
    this.deptCollection = {
     // accountingTransactionId: 0,
      collectionAmount: 0,
      createdAt: new Date,
      createdBy: 0,
      id: 0,
      cashBoxId: 0,
      description: '',
      customerId: 0
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
   // this.deptCollection.accountingTransactionId = this.data.deptCollection.accountingTransactionId;
    this.deptCollection.id = this.data.deptCollection.id;
    this.deptCollection.cashBoxId = parseInt(this.data.deptCollection.cashBoxId.toString());
    this.deptCollection.collectionAmount = this.data.deptCollection.collectionAmount;
    if (this.data.deptCollection.id == 0) {
      this.service.add(this.data.deptCollection).subscribe((data) => {
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
