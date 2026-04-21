import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualEducatorLessonsComponent } from './actual-educator-lessons.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { ActualEducatorLessonRouterModule } from './actual-educator-lesson-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ActualEducatorLessonRouterModule
  ],
  declarations: [ActualEducatorLessonsComponent]
})
export class ActualEducatorLessonsModule { }
