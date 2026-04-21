import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPaymentPlanComponent } from './customer-payment-plan.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerPaymentPlanComponent,
        data: {
            title: 'Müşteri Ödeme Planlama'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerPaymentPlanRouterModule { }
