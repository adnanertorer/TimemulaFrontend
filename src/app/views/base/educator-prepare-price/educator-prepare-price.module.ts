import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorPreparePriceComponent } from './educator-prepare-price.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { EducatorPreparePriceRouterModule } from './educator-prepare-price-router.module';
import { PaginatorModule } from "src/app/shared";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    EducatorPreparePriceRouterModule,
    PaginatorModule
],
  declarations: [EducatorPreparePriceComponent]
})
export class EducatorPreparePriceModule { }
