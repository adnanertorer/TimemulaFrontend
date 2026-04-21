import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHealthComponent } from './customer-health.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerHealthComponent,
    data: {
      title: 'Müşteri Sağlık Formu'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerHealthRouterModule { }