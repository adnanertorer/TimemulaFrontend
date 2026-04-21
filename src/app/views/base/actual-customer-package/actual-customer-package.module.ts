import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualCustomerPackageComponent } from './actual-customer-package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ActualCustomerPackageRouterModule } from './actual-customer-package-router.module';
import { NgbDatepickerModule, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    ActualCustomerPackageRouterModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    NgbModule,
    DatePickerModule
  ],
  declarations: [ActualCustomerPackageComponent]
})
export class ActualCustomerPackageModule { }
