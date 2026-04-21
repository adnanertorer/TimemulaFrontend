import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseaseMainComponent } from './disease-main.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { DiseaseMainRouterModule } from './disease-main-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    DiseaseMainRouterModule
  ],
  declarations: [DiseaseMainComponent]
})
export class DiseaseMainModule { }
