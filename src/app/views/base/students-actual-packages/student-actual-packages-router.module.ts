import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsActualPackagesComponent } from './students-actual-packages.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsActualPackagesComponent,
    data: {
      title: 'Öğrenci Paket Listesi'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsActualPackagesRouterModule { }