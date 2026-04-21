import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageClassroomComponent } from './package-classroom.component';

const routes: Routes = [
  {
    path: '',
    component: PackageClassroomComponent,
    data: {
      title: 'Ders/Sınıf İlişkileri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PackageClassroomRouterModule { }