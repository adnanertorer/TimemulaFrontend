import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorPackageLessonListComponent } from './educator-package-lesson-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EducatorPackageLessonRouterModule } from './educator-package-lesson-list-router';

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
    EducatorPackageLessonRouterModule
  ],
  declarations: [EducatorPackageLessonListComponent]
})
export class EducatorPackageLessonListModule { }
