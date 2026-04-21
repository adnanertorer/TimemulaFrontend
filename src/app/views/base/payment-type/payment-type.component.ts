import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PaymentTypeModel } from 'src/app/shared/model/payment-type-model';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';
declare let alertify: any;

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.css']
})
export class PaymentTypeComponent implements OnInit {

  paymetnType: PaymentTypeModel;
  list: PaymentTypeModel[] = [];
  form: UntypedFormGroup;
  pageOfItems: Array<any>;
  buttonText = 'Kaydet';
  
  constructor(private service: PaymentTypeService) { }

  ngOnInit() {
    this.paymetnType = {
      createdBy: 0,
      id: 0,
      paymentTypeName: ''
    };

    this.form = new UntypedFormGroup({
      'payment_type_name': new UntypedFormControl(this.paymetnType.paymentTypeName, Validators.required)
    });
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.paymetnType = resource;
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
    if (this.paymetnType.id == 0) {
      this.service.add(this.paymetnType).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.paymetnType).subscribe((data) => {
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
      this.list = data.dynamicClass as PaymentTypeModel[];
      this.pageOfItems = this.list;
    })
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

}
