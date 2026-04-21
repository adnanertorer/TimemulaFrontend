import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLessonScheduleComponent } from './customer-lesson-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLessonScheduleComponent,
    data: {
      title: 'Paket Ders Kaydı'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerLessonScheduleRouterModule { }