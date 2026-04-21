import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailRouterModule } from './customer-detail-router.module';
import { CustomerDetailComponent } from './customer-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerDetailRouterModule
  ],
  declarations: [CustomerDetailComponent]
})
export class CustomerDetailModule { }
