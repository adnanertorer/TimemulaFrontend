import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseaseSubComponent } from './disease-sub.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { DiseaseSubRouterModule } from './disease-sub-route.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    DiseaseSubRouterModule
  ],
  declarations: [DiseaseSubComponent]
})
export class DiseaseSubModule { }
