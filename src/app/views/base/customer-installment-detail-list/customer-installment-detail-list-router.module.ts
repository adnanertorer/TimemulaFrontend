import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInstallmentDetailListComponent } from './customer-installment-detail-list.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerInstallmentDetailListComponent,
        data: {
            title: 'Müşteri Taksitleri'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerInstallmentDetailListRouterModule { }
