import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageClassroomComponent } from './package-classroom.component';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { MyMaterialModule } from 'src/app/material.module';
import { PackageClassroomRouterModule } from './package-classroom-router.module';
import { PaginatorModule } from "src/app/shared";

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    JwPaginationModule,
    MyMaterialModule,
    PackageClassroomRouterModule,
    PaginatorModule
],
    exports: [
        PackageClassroomComponent
    ],
    declarations: [PackageClassroomComponent]
})
export class PackageClassroomModule { }
