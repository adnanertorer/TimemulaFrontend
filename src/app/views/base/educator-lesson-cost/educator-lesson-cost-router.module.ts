import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorLessonCostComponent } from './educator-lesson-cost.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorLessonCostComponent,
        data: {
            title: 'Eğitmen Hakedişleri'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorLessonCostRouterModule { }
