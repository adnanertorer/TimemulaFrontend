import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryTypesComponent } from './salary-types.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryTypesComponent,
    data: {
      title: 'Maaş Türleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryTypesRouterModule { }