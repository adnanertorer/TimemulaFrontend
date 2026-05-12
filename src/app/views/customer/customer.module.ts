import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRouterModule } from './customer-router.module';
import { MyMaterialModule } from 'src/app/material.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomerRouterModule,
    ReactiveFormsModule,
    MyMaterialModule,
    DatePickerModule,
    PaginatorModule
],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
