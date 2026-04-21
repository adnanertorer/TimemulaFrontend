import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorPackageLessonListComponent } from './educator-package-lesson-list.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorPackageLessonListComponent,
        data: {
            title: 'Eğitmen Paket Seansları'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorPackageLessonRouterModule { }
