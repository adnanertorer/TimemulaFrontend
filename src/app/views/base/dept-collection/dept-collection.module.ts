import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptCollectionComponent } from './dept-collection.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { DeptCollectionRouterModule } from './dept-collection-router.module';
import { DatePickerComponent } from "src/app/shared/components/date-picker-component/date-picker-component";
import { PaginatorModule } from "src/app/shared";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    DeptCollectionRouterModule,
    DatePickerComponent,
    PaginatorModule
],
  declarations: [DeptCollectionComponent]
})
export class DeptCollectionModule { }
