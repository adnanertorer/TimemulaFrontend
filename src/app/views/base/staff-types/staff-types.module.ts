import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffTypesComponent } from './staff-types.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from '../../../material.module';
import { StaffTypesRouterModule } from './staff-types-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    StaffTypesRouterModule
  ],
  declarations: [StaffTypesComponent]
})
export class StaffTypesModule { }
