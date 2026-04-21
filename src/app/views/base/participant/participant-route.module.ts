import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantComponent } from './participant.component';

const routes: Routes = [
  {
    path: '',
    component: ParticipantComponent,
    data: {
      title: 'Katılım Türleri'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRouterModule { }