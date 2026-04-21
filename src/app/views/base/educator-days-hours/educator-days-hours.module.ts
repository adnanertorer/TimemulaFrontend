import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorDaysHoursComponent } from './educator-days-hours.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { EducatorDaysHoursRouterModule } from './educator-days-hours-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    EducatorDaysHoursRouterModule
  ],
  declarations: [EducatorDaysHoursComponent]
})
export class EducatorDaysHoursModule { }
