import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInstallmentListComponent } from './customer-installment-list.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerInstallmentListComponent,
        data: {
            title: 'Müşteri Ödeme Planı Listesi'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerInstallmentListRouterModule { }
