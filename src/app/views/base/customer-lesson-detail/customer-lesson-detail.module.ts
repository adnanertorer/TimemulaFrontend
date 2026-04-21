import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLessonDetailComponent } from './customer-lesson-detail.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { CustomerLessonDetailRouterModule } from './customer-lesson-detail-router.module';
import { PaginatorModule } from "src/app/shared";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    CustomerLessonDetailRouterModule,
    PaginatorModule
],
  declarations: [CustomerLessonDetailComponent]
})
export class CustomerLessonDetailModule { }
