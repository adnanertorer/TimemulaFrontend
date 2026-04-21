import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VCustomerPackageBasicInfoModel } from 'src/app/shared/model/v-customer-package-basic-info-model';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-educator-package-student-list',
  templateUrl: './educator-package-student-list.component.html',
  styleUrls: ['./educator-package-student-list.component.css']
})
export class EducatorPackageStudentListComponent implements OnInit {

  private readonly mainUrl = `${environment.mainUrl}`;
  
  constructor(public service: LessonEducatorService, private router: Router) { }

  ngOnInit() {
    console.log(this.service.selectedTeacherStudents);
  }

  openLessons(id){
    this.service.selectedCustomerId = id;
    //egitmen-islemleri/ogrenciler-takvimi.html
    this.router.navigate(['egitmen-islemleri/ogrenciler-takvimi.html/']);
  }

}
