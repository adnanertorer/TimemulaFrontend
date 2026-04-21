import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTransactionsComponent } from './account-transactions.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { AccountTransactionsRouterModule } from './account-transactions-router.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatorModule } from "src/app/shared";
import { DatePickerComponent } from 'src/app/shared/components/date-picker-component/date-picker-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    AccountTransactionsRouterModule,
    MatFormFieldModule,
    DatePickerComponent,
    PaginatorModule,
    
],
  declarations: [AccountTransactionsComponent]
})
export class AccountTransactionsModule { }
