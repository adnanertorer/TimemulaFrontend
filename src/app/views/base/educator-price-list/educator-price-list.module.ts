import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorPriceListComponent } from './educator-price-list.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { EducatorPriceListRouterModule } from './educator-price-list-router.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PaginatorModule } from "src/app/shared";
import { DatePickerComponent } from "src/app/shared/components/date-picker-component/date-picker-component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    NgbDatepickerModule,
    DatePickerModule,
    EducatorPriceListRouterModule,
    PaginatorModule,
    DatePickerComponent
],
  declarations: [EducatorPriceListComponent]
})
export class EducatorPriceListModule { }
