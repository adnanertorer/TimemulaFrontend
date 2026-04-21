import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportComponent } from './main-report.component';
import { MainReportRouterModule } from './main-report-router.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
    ScheduleModule,
    MainReportRouterModule
  ],
  declarations: [MainReportComponent]
})
export class MainReportModule { }
