import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInstallmentComponent } from './customer-installment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { NgbDatepickerModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CustomerInstallmentRouterModule } from './customer-installment-router.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    NgbModule,
    DatePickerModule,
    CustomerInstallmentRouterModule
  ],
  declarations: [CustomerInstallmentComponent]
})
export class CustomerInstallmentModule { }
