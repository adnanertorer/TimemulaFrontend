import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDetailComponent,
    data: {
      title: 'Müşteri Detayı'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDetailRouterModule { }
