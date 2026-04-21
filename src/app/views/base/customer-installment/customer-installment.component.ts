import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { CustomerInstallmentModel } from 'src/app/shared/model/customer-installment-model';
import { InstallmentResultModel } from 'src/app/shared/model/installment-result-model';
import { VCurrentBalanceModel } from 'src/app/shared/model/v-current-balance-model';
import { AccountingTransactionService } from 'src/app/shared/services/accounting-transaction.service';
import { CustomerInstallmentService } from 'src/app/shared/services/customer-installment.service';
declare let alertify: any;

@Component({
  selector: 'app-customer-installment',
  templateUrl: './customer-installment.component.html',
  styleUrls: ['./customer-installment.component.css']
})
export class CustomerInstallmentComponent implements OnInit {

  transaction: VCurrentBalanceModel;
  selectedCustomerId: number = 0;
  customerName:string ="";
  installment: CustomerInstallmentModel;
  instalmentResult: InstallmentResultModel;

  manuelTotalPayment: number = 0;
  
  @ViewChild('date')
  public Date: DatePickerComponent;
  
  public dateValue: Date = new Date();
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month , 7);
  public maxDate: Date = new Date(this.fullYear, this.month, 27);

  startDateModel: NgbDateStruct;
  selectedRelationId: string = '';
  
  constructor(private accontingService: AccountingTransactionService,
     private service: CustomerInstallmentService, private activatedRoute: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
    this.installment = {
      amount: 0,
      createdAt: new Date(),
      createdBy: 0,
      customerId: 0,
      dayNumber: 0,
      id: 0,
      interest: 0,
      isPackage: false,
      serviceId: 0,
      totalInstallment: 0
    };

    this.instalmentResult = {
      interestAmount: 0,
      mainDept: 0,
      paymentAmount: 0,
      paymentDates: [],
      totalInstallment: 0,
      withInterestAmount: 0,
      customerId: 0,
      createdAt: new Date(),
      createdBy: 0,
      mainId: 0
    };

    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.selectedRelationId = params['relationId'];
      this.selectedCustomerId = parseInt(id);
      this.installment.customerId = this.selectedCustomerId;
      this.instalmentResult.customerId = this.selectedCustomerId;
      this.getBalance();
    });
  }

  onDateChange(){
    this.dateValue = this.Date.value;
  }

  setManuelPaymentAmount(){
    this.manuelTotalPayment = this.transaction.currentBalance;
  }

  allDept(){
    this.installment.amount = this.transaction.currentBalance;
  }

  getBalance(){
    this.accontingService.getCustomerDeptDetail(this.selectedCustomerId).subscribe((data)=>{
      if(data.success){
        this.transaction = data.dynamicClass as VCurrentBalanceModel;
        this.customerName = this.transaction.currentAccount;
      }
    })
  }

  addManuel(){
    let errorStr: string = '';
    const manuelDate = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate(),0, 0, 0, 0);
    this.installment.dayNumber = 1;
    this.installment.totalInstallment = 1;
    this.installment.interest = 0;
    this.installment.isManuel = true;
    this.installment.paymentDate = manuelDate;
    this.installment.amount = this.manuelTotalPayment;
    if(this.manuelTotalPayment == 0){
      errorStr += 'Lütfen ödeme miktarını yazınız.\n';
    }
    this.service.addManuel(this.installment).subscribe((data)=>{
      if(data.success){
        this.instalmentResult = data.dynamicClass as InstallmentResultModel;
        this.instalmentResult.customerId = this.selectedCustomerId;
      }else{
        alert(data.clientMessage);
      }
    });
  }

  add(){
    let errorStr: string = '';
    if(this.installment.dayNumber>28){
      errorStr += 'Ödeme günü 28 den büyük olamaz.\n';
    }
    if(this.installment.dayNumber  == 0){
      errorStr += 'Ödeme günü 1 den küçük olamaz.\n';
    }
    if(this.installment.amount == 0){
      errorStr += 'Lütfen ödeme miktarını yazınız.\n';
    }
    if(this.installment.dayNumber == 0){
      errorStr += 'Lütfen gün bilgisini yazınız.\n';
    }
    if(this.installment.totalInstallment == 0){
      errorStr += 'Lütfen taksit miktarını yazınız.\n';
    }
    if(errorStr.trim().length >0){
      alert(errorStr);
    }else{
      this.service.add(this.installment).subscribe((data)=>{
        if(data.success){
          this.instalmentResult = data.dynamicClass as InstallmentResultModel;
          this.instalmentResult.customerId = this.selectedCustomerId;
        }else{
          alert(data.clientMessage);
        }
      })
    }
  }

  approve(){
    this.instalmentResult.relatingId = this.selectedRelationId;
    this.service.addSub(this.instalmentResult).subscribe((data)=>{
      if(data.success){
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Taksitlendirme işlemi tamamlandı', 2);
        this.router.navigate(['cari-hesaplar/vadeli-alacak-tahsilati.html']);
      }else{
        alertify.error('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2); 
      }
    })
  }

}
