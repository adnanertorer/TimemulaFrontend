import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMainPackageListComponent } from './customer-main-package-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerMainPackageListComponent,
    data: {
      title: 'Müşteri Paket Detayı'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMainPackageRouterModule { }