import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLessonComponent } from './customer-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLessonComponent,
    data: {
      title: 'Müşteri Ders Kaydı'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerLessonRouterModule { }