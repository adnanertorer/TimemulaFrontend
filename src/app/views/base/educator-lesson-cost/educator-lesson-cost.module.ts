import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorLessonCostComponent } from './educator-lesson-cost.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { EducatorLessonCostRouterModule } from './educator-lesson-cost-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    EducatorLessonCostRouterModule
  ],
  declarations: [EducatorLessonCostComponent]
})
export class EducatorLessonCostModule { }
