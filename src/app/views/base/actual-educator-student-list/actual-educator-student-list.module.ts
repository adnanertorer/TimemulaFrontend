import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualEducatorStudentListComponent } from './actual-educator-student-list.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { ActualEducatorStudentListRouterModule } from './actual-educator-student-list-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ActualEducatorStudentListRouterModule
  ],
  declarations: [ActualEducatorStudentListComponent]
})
export class ActualEducatorStudentListModule { }
