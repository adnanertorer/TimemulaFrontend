import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom.component';

const routes: Routes = [
  {
    path: '',
    component: ClassroomComponent,
    data: {
      title: 'Derslik Tanımları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRouterModule { }