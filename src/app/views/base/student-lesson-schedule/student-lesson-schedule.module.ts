import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLessonScheduleComponent } from './student-lesson-schedule.component';
import { FormsModule } from '@angular/forms';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { StudentLessonScheduleRouterModule } from './student-lesson-schedule-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScheduleModule,
    StudentLessonScheduleRouterModule
  ],
  declarations: [StudentLessonScheduleComponent]
})
export class StudentLessonScheduleModule { }
