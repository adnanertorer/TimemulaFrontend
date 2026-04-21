import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffsComponent } from './staffs.component';

const routes: Routes = [
  {
    path: '',
    component: StaffsComponent,
    data: {
      title: 'Personeller'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRouterModule { }
