import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRequestComponent } from './meeting-request.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from 'src/app/material.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MeetingRequestRouterModule } from './meeting-request-router.module';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    DatePickerModule,
    NgbTimepickerModule,
    MeetingRequestRouterModule
  ],
  declarations: [MeetingRequestComponent]
})
export class MeetingRequestModule { }
