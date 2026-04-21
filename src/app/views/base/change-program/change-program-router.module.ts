import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeProgramComponent } from './change-program.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeProgramComponent,
    data: {
      title: 'Paket Program Değişikliği'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeProgramRouterModule { }