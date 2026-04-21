import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseMainComponent } from './disease-main.component';

const routes: Routes = [
  {
    path: '',
    component: DiseaseMainComponent,
    data: {
      title: 'Sağlık Genel Başlıklar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseMainRouterModule { }