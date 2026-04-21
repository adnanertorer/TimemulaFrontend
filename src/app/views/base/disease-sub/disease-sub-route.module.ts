import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseSubComponent } from './disease-sub.component';

const routes: Routes = [
  {
    path: '',
    component: DiseaseSubComponent,
    data: {
      title: 'Sağlık Alt Başlıklar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseSubRouterModule { }