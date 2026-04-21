import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPackageComponent } from './customer-package.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { CustomerPackageRouterModule } from './customer-package-router.module';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';




@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    CustomerPackageRouterModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    DatePickerModule
  ],
  declarations: [CustomerPackageComponent]
})
export class CustomerPackageModule { }
