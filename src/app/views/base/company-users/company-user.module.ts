import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from '../../../material.module';
import { PaginatorModule } from "src/app/shared";
import { CompanyUsersComponent } from './company-users.component';
import { CompanyUserRouterModule } from './company-user-route.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    CompanyUserRouterModule,
    PaginatorModule
],
  declarations: [CompanyUsersComponent]
})
export class CompanyUserModule { }
