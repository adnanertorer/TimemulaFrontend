import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentActualLessonsComponent } from './student-actual-lessons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { StudentsActualLessonsRouterModule } from './students-actual-lessons-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    StudentsActualLessonsRouterModule
  ],
  declarations: [StudentActualLessonsComponent]
})
export class StudentActualLessonsModule { }
