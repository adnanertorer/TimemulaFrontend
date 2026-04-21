import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryTypesComponent } from './salary-types.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from '../../../material.module';
import { SalaryTypesRouterModule } from './salary-types-router.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    SalaryTypesRouterModule,
    PaginatorModule
],
  declarations: [SalaryTypesComponent]
})
export class SalaryTypesModule { }
