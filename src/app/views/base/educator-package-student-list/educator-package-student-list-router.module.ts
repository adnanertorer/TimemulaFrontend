import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducatorPackageStudentListComponent } from './educator-package-student-list.component';

const routes: Routes = [
    {
        path: '',
        component: EducatorPackageStudentListComponent,
        data: {
            title: 'Öğrenciler'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EducatorPackageStudentListRouterModule { }
