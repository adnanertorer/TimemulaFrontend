import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorsComponent } from './educators.component';

const routes: Routes = [
  {
    path: '',
    component: EducatorsComponent,
    data: {
      title: 'Eğitmen Listesi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducatorsRouterModule { }