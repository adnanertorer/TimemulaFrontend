import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubServiceComponent } from './sub-service.component';

const routes: Routes = [
  {
    path: '',
    component: SubServiceComponent,
    data: {
      title: 'Alt Hizmet Tanımları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubServiceRouterModule { }