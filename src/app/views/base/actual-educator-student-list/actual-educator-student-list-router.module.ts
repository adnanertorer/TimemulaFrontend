import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualEducatorStudentListComponent } from './actual-educator-student-list.component';

const routes: Routes = [
  {
    path: '',
    component: ActualEducatorStudentListComponent,
    data: {
      title: 'Eğitmen Öğrenci Listesi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualEducatorStudentListRouterModule { }