import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorLessonListComponent } from './educator-lesson-list.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorLessonListComponent,
        data: {
            title: 'Eğitmen Dersleri'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorLessonListRouterModule { }
