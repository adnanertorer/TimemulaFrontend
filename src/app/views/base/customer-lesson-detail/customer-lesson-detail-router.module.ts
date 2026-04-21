import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLessonDetailComponent } from './customer-lesson-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLessonDetailComponent,
    data: {
      title: 'Müşteri Paket Listesi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerLessonDetailRouterModule { }