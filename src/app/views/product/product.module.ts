import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ProductRouterModule } from './product-router.module';
import { MyMaterialModule } from 'src/app/material.module';
import { PaginatorModule } from "src/app/shared";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    ProductRouterModule,
    ReactiveFormsModule,
    MyMaterialModule,
    PaginatorModule
],
  declarations: [ProductComponent]
})
export class ProductModule { }
