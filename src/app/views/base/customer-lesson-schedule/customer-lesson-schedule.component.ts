import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, EventSettingsModel, MonthAgendaService, MonthService, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';

@Component({
  selector: 'app-customer-lesson-schedule',
  templateUrl: './customer-lesson-schedule.component.html',
  styleUrls: ['./customer-lesson-schedule.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService,
    AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService
  ]
})
export class CustomerLessonScheduleComponent implements OnInit {
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel;
  public educatorName: string;
  constructor(private service: LessonEducatorService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const lessons = this.service.selectedCustomerLessons
      .filter(i => i.customerId == this.service.selectedCustomerId)
      .map(item => ({
        ...item,
        subject: item.customer?.name + ' ' + item.customer?.surname + ' - ' + item.artPackage?.artPackageName,
        name: item.staff?.name + ' ' + item.staff?.surname,
      }));
    this.educatorName = lessons.length > 0 ? lessons[0].staff?.name + ' ' + lessons[0].staff?.surname : '';
    console.log(lessons);

    this.eventSettings = {
      dataSource: lessons,
      fields: {
        id: 'id',
        subject: { name: 'subject' },
        startTime: { name: 'startDate' },
        endTime: { name: 'finishDate' },
        description: { name: 'name' },
      },
      allowAdding: false,
      allowDeleting: false,
      allowEditing: false
    }
  }

}
