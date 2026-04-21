import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingRequestComponent } from './meeting-request.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingRequestComponent,
    data: {
      title: 'Randevu ve Görüşmeler'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRequestRouterModule { }