import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyUsersComponent } from './company-users.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyUsersComponent,
    data: {
      title: 'Kullanıcı Tanımları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyUserRouterModule { }