import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInstallmentDetailListComponent } from './customer-installment-detail-list.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerInstallmentDetailListRouterModule } from './customer-installment-detail-list-router.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    MatFormFieldModule,
    CustomerInstallmentDetailListRouterModule
  ],
  declarations: [CustomerInstallmentDetailListComponent]
})
export class CustomerInstallmentDetailListModule { }
