import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainReportComponent } from './main-report.component';


const routes: Routes = [
  {
    path: '',
    component: MainReportComponent,
    data: {
      title: 'Genel Rapor'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainReportRouterModule { }