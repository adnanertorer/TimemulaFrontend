import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInstallmentComponent } from './customer-installment.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerInstallmentComponent,
        data: {
            title: 'Müşteri Ödeme Planlama'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerInstallmentRouterModule { }
