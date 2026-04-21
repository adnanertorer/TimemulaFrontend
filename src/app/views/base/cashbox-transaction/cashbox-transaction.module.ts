import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashboxTransactionComponent } from './cashbox-transaction.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { CashBoxTransactionRouterModule } from './cashbox-transaction-router.module';
import { DatePickerComponent } from 'src/app/shared/components/date-picker-component/date-picker-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    DatePickerComponent,
    CashBoxTransactionRouterModule
],
  declarations: [CashboxTransactionComponent]
})
export class CashboxTransactionModule { }
