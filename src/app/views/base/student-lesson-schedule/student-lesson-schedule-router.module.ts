import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLessonScheduleComponent } from './student-lesson-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLessonScheduleComponent,
    data: {
      title: 'Öğrenci Actual Takvim'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentLessonScheduleRouterModule { }