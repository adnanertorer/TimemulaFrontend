import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationComponent } from './participation.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { ParticipationRouterModule } from './participation-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    ParticipationRouterModule
  ],
  declarations: [ParticipationComponent]
})
export class ParticipationModule { }
