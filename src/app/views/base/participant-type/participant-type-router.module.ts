import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantTypeComponent } from './participant-type.component';

const routes: Routes = [
  {
    path: '',
    component: ParticipantTypeComponent,
    data: {
      title: 'Katılımcı Tanımları'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantTypeRouterModule { }