import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtPackageComponent } from './art-package.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { ArtPackageRouterModule } from './art-package-route.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    ArtPackageRouterModule
  ],
  declarations: [ArtPackageComponent]
})
export class ArtPackageModule { }
