import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualEducatorLessonsComponent } from './actual-educator-lessons.component';

const routes: Routes = [
  {
    path: '',
    component: ActualEducatorLessonsComponent,
    data: {
      title: 'Eğitmen Dersleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualEducatorLessonRouterModule { }