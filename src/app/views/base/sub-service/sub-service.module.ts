import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubServiceComponent } from './sub-service.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from '../../../material.module';
import { SubServiceRouterModule } from './sub-service-route.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    SubServiceRouterModule
  ],
  declarations: [SubServiceComponent]
})
export class SubServiceModule { }
