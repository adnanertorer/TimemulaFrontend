import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualCustomerPackageComponent } from './actual-customer-package.component';

const routes: Routes = [
  {
    path: '',
    component: ActualCustomerPackageComponent,
    data: {
      title: 'Ders Kaydırma Modülü'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualCustomerPackageRouterModule { }