import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHealthComponent } from './customer-health.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { CustomerHealthRouterModule } from './customer-health-router.module';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    MatTableExporterModule,
    CustomerHealthRouterModule
  ],
  declarations: [CustomerHealthComponent]
})
export class CustomerHealthModule { }
