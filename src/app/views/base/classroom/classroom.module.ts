import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './classroom.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from '../../../material.module';
import { ClassroomRouterModule } from './classroom-route.module';
import { PaginatorModule } from "src/app/shared";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    ClassroomRouterModule,
    PaginatorModule
],
  declarations: [ClassroomComponent]
})
export class ClassroomModule { }
