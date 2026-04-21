import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTransactionsComponent } from './account-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: AccountTransactionsComponent,
    data: {
      title: 'Cari Hesap Hareketleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTransactionsRouterModule { }