import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorPriceListComponent } from './educator-price-list.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorPriceListComponent,
        data: {
            title: 'Eğitmen Hakediş Listesi'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorPriceListRouterModule { }
