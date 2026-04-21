import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeptCollectionComponent } from './dept-collection.component';

const routes: Routes = [
  {
    path: '',
    component: DeptCollectionComponent,
    data: {
      title: 'Tahsilat Formu'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptCollectionRouterModule { }