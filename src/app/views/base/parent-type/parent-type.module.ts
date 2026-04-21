import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentTypeComponent } from './parent-type.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { ParentTypeRouterModule } from './parent-type-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    ParentTypeRouterModule
  ],
  declarations: [ParentTypeComponent]
})
export class ParentTypeModule { }
