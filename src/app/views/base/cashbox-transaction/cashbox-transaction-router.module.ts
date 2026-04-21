import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashboxTransactionComponent } from './cashbox-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: CashboxTransactionComponent,
    data: {
      title: 'Kasa Hareketleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashBoxTransactionRouterModule { }