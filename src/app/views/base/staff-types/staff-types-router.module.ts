import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffTypesComponent } from './staff-types.component'

const routes: Routes = [
  {
    path: '',
    component: StaffTypesComponent,
    data: {
      title: 'Personel Tipleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffTypesRouterModule { }