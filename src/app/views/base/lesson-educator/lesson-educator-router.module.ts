import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonEducatorComponent } from './lesson-educator.component';


const routes: Routes = [
  {
    path: '',
    component: LessonEducatorComponent,
    data: {
      title: 'Ders/Eğitmen İlişkisi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonEducatorRouterModule { }