import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentActualLessonsComponent } from './student-actual-lessons.component';

const routes: Routes = [
  {
    path: '',
    component: StudentActualLessonsComponent,
    data: {
      title: 'Öğrenci Paket İçeriği'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsActualLessonsRouterModule { }