import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeProgramComponent } from './change-program.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { ChangeProgramRouterModule } from './change-program-router.module';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JwPaginationModule } from 'jw-angular-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    JwPaginationModule,
    ChangeProgramRouterModule
  ],
  declarations: [ChangeProgramComponent]
})
export class ChangeProgramModule { }
