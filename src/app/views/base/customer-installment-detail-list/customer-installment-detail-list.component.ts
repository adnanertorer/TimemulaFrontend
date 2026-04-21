import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { Customer } from 'src/app/shared/model/customer';
import { DeptCollectionDialogData } from 'src/app/shared/model/dept-collection-dialog-data';
import { DeptCollectionModel } from 'src/app/shared/model/dept-collection-model';
import { InstallmentDeptCollectionModel } from 'src/app/shared/model/installment-dept-collection-model';
import { VInstallmentSubModel } from 'src/app/shared/model/v-installment-sub-model';
import { CustomerInstallmentService } from 'src/app/shared/services/customer-installment.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { InstallmentCollectionComponent } from '../installment-collection/installment-collection.component';

@Component({
  selector: 'app-customer-installment-detail-list',
  templateUrl: './customer-installment-detail-list.component.html',
  styleUrls: ['./customer-installment-detail-list.component.css']
})
export class CustomerInstallmentDetailListComponent implements OnInit {

  deptCollection: InstallmentDeptCollectionModel = {
    // accountingTransactionId: 0,
     collectionAmount: 0,
     createdAt: new Date,
     createdBy: 0,
     id: 0,
     cashBoxId: 0,
     description: '',
     customerId: 0,
     installmentDetailId: 0
   };
  list: VInstallmentSubModel[] = [];
  displayedColumns: string[] = ['name', 'paymentDate', 'paymentAmount', 'isPayment', 'paymentAt', 'id'];
  dataSource: MatTableDataSource<VInstallmentSubModel>;
  @ViewChild('installmentSubPaginator') paginator: MatPaginator;
  @ViewChild('installmentSubSort') sort: MatSort; 
  selectedMainId: number = 0;
  customerName: string = '';
  modalData: DeptCollectionDialogData;
  cashBoxList: CashboxModel[] = [];
  strcurrentAccount: string = '';
  strDept: number = 0;


   constructor(private service: CustomerInstallmentService, private activatedRoute: ActivatedRoute,
    private customerService: CustomerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.modalData = {
      cashBoxList: [],
      currentAccount: '',
      deptCollection: this.deptCollection,
      strDept: 0
    }
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.selectedMainId = parseInt(id);
      this.getList()
    });
  }

  openDialog(): void {
    this.modalData = {
      cashBoxList: this.cashBoxList,
      currentAccount: this.strcurrentAccount,
      deptCollection: this.deptCollection,
      strDept: this.strDept
    }
    const dialogRef = this.dialog.open(InstallmentCollectionComponent, {
      width: '600px',
      data: {cashBoxList: this.cashBoxList, currentAccount: this.strcurrentAccount, deptCollection: this.deptCollection, strDept: this.strDept}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getList(){
    this.service.getSubList(this.selectedMainId).subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as VInstallmentSubModel[];
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        const customerId = this.list[0].customerId;
        this.customerService.getDetails(customerId).subscribe((data)=>{
          if(data.success){
            const customer = data.dynamicClass as Customer;
            this.customerName = customer.name+' '+customer.surname;
          }
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCollection(resource: any): void{
    this.deptCollection.customerId = resource.customerId;
    this.deptCollection.collectionAmount = resource.paymentAmount;
    this.deptCollection.installmentDetailId = resource.id;
    this.strcurrentAccount = resource.name+' '+resource.surname;
    this.strDept = resource.paymentAmount;
    this.openDialog();
  }

}
