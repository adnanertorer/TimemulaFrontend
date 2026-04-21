import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashboxComponent } from './cashbox.component';

const routes: Routes = [
  {
    path: '',
    component: CashboxComponent,
    data: {
      title: 'Kasa Tanımları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashBoxRouterModule { }