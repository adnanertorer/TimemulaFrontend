import { Component, OnInit } from '@angular/core';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import Constants from 'src/app/shared/tools/constants';
import { CashBoxTypeEnum, environment } from 'src/environments/environment';
declare let alertify: any;

@Component({
  selector: 'app-cashbox',
  templateUrl: './cashbox.component.html',
  styleUrls: ['./cashbox.component.css']
})
export class CashboxComponent implements OnInit {

  cashBox: CashboxModel;
  cashBoxList: CashboxModel[] = [];
  buttonText = Constants.Save;
  pageOfItems: Array<any>;
  isBank: boolean = false;
  cashTypes = CashBoxTypeEnum;

  constructor(private service: CashboxService) { }

  ngOnInit() {
    this.cashBox = {
      bankAccountNumber: '',
      cashBoxName: '',
      cashBoxType: 0,
      createdAt: new Date,
      createdBy: 0,
      iban: '',
      id: 0
    }
    this.getList();
  }

  typeOnChange(source) {
    if(this.cashTypes.Bank == parseInt(source)){
      this.isBank = true;
    }else{
      this.isBank = false;
    }
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.cashBox = resource;
    if(this.cashBox.cashBoxType == this.cashTypes.Bank){
      this.isBank = true;
    }else{
      this.isBank = false;
    }
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.cashBox.id == 0) {
      this.service.add(this.cashBox).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.cashBox).subscribe((data) => {
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
    this.service.getList().subscribe((data) => {
      this.cashBoxList = data.dynamicClass as CashboxModel[];
      this.pageOfItems = this.cashBoxList;
    })
  }

}
