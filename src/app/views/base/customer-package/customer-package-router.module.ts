import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPackageComponent } from './customer-package.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPackageComponent,
    data: {
      title: 'Müşteri Paket Kaydı'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPackageRouterModule { }