import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeartsServiceComponent } from './lifearts-service.component';

const routes: Routes = [
  {
    path: '',
    component: LifeartsServiceComponent,
    data: {
      title: 'Hizmet Tanımları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeArtsServiceRouterModule { }