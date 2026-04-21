import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLessonScheduleComponent } from './customer-lesson-schedule.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { CustomerLessonScheduleRouterModule } from './customer-lesson-schedule-router.module';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    ScheduleModule ,
    CustomerLessonScheduleRouterModule
  ],
  declarations: [CustomerLessonScheduleComponent]
})
export class CustomerLessonScheduleModule { }
