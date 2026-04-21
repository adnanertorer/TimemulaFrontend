import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndOfDayDetailComponent } from './end-of-day-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { EndOfDetailRouterModule } from './end-of-detail-router-module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        JwPaginationModule,
        EndOfDetailRouterModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatExpansionModule,
        MatListModule
    ],
    declarations: [EndOfDayDetailComponent]
})
export class EndOfDayDetailModule {}
