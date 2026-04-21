import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorDaysHoursComponent } from './educator-days-hours.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorDaysHoursComponent,
        data: {
            title: 'Eğitmen Mesai Gün ve Saatleri'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorDaysHoursRouterModule { }
