import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndsOfDayComponent } from './ends-of-day.component';

const routes: Routes = [
    {
        path: '',
        component: EndsOfDayComponent,
        data: {
            title: 'Gün sonu raporu'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EndsOfDayRouterModule { }
