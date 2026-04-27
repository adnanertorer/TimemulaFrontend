import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { PaginatorModule } from "src/app/shared";
import { MyMaterialModule } from 'src/app/material.module';
import { RolesRouterModule } from './roles-route.module';
import { RolesComponent } from '../roles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    RolesRouterModule,
    PaginatorModule
],
  declarations: [RolesComponent]
})
export class RolesModule { }
