import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeartsServiceComponent } from './lifearts-service.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from '../../../material.module';
import { LifeArtsServiceRouterModule } from './lifearts-service-route.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    LifeArtsServiceRouterModule
  ],
  declarations: [LifeartsServiceComponent]
})
export class LifeartsServiceModule { }
