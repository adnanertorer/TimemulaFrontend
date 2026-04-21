import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorPreparePriceComponent } from './educator-prepare-price.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorPreparePriceComponent,
        data: {
            title: 'Eğitmen Hakediş Giriş Listesi'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorPreparePriceRouterModule { }
