import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentTypeComponent } from './payment-type.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentTypeComponent,
    data: {
      title: 'Ödeme Türleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentTypeRouterModule { }