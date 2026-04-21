import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { CustomerLessonRouterModule } from './customer-lesson-router.module';
import { ScheduleModule  } from '@syncfusion/ej2-angular-schedule';
import { CustomerLessonComponent } from './customer-lesson.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    ScheduleModule ,
    MyMaterialModule,
    CustomerLessonRouterModule,   
  ],
  declarations: [CustomerLessonComponent]
})
export class CustomerLessonModule { }
