import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndsOfDayComponent } from './ends-of-day.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { EndsOfDayRouterModule } from './ends-of-day-router.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        JwPaginationModule,
        EndsOfDayRouterModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatCardModule
    ],
    declarations: [EndsOfDayComponent]
})
export class EndsOfDayModule { }
