import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorPackageStudentListComponent } from './educator-package-student-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EducatorPackageStudentListRouterModule } from './educator-package-student-list-router.module';

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
    EducatorPackageStudentListRouterModule
  ],
  declarations: [EducatorPackageStudentListComponent]
})
export class EducatorPackageStudentListModule { }
