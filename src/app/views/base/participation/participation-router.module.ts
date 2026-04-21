import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipationComponent } from './participation.component';

const routes: Routes = [
  {
    path: '',
    component: ParticipationComponent,
    data: {
      title: 'Yoklama Sonuç Tanımları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipationRouterModule { }