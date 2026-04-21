import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorsComponent } from './educators.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { EducatorsRouterModule } from './educators-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    EducatorsRouterModule
  ],
  declarations: [EducatorsComponent]
})
export class EducatorsModule { }
