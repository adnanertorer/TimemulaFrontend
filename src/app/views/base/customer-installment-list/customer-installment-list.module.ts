import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInstallmentListComponent } from './customer-installment-list.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CustomerInstallmentListRouterModule } from './customer-installment-list-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    NgbDatepickerModule,
    MatFormFieldModule,
    NgbModule,
    DatePickerModule,
    CustomerInstallmentListRouterModule
  ],
  declarations: [CustomerInstallmentListComponent]
})
export class CustomerInstallmentListModule { }
