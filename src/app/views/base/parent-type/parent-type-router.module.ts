import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentTypeComponent } from './parent-type.component';

const routes: Routes = [
  {
    path: '',
    component: ParentTypeComponent,
    data: {
      title: 'Ebeveyn Türleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentTypeRouterModule { }