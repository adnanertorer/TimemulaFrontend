import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EducatorLessonCurrentModel } from 'src/app/shared/model/educator-lesson-current-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { VEducatorCurrentLessonModel } from 'src/app/shared/model/v-educator-current-lesson-model';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-educator-lesson-list',
  templateUrl: './educator-lesson-list.component.html',
  styleUrls: ['./educator-lesson-list.component.css']
})
export class EducatorLessonListComponent implements OnInit {
  selectedEducatorId: number = 0;
  staffList: StaffModel[] = [];
  educatorLessonList: EducatorLessonCurrentModel[] = [];
  tempEducatorLessionList: EducatorLessonCurrentModel[] = [];

  private readonly mainUrl = `${environment.mainUrl}`;

  constructor(private service: LessonEducatorService, private staffService: StaffService,
    private router: Router) { }

  ngOnInit() {
    this.getEducators();
  }

  getEducators(){
    this.staffService.getTeachers().subscribe((data)=>{
      this.staffList = data.dynamicClass as StaffModel[];
    })
  }


  staffOnChange(id) {
    this.selectedEducatorId = parseInt(id);
    this.getList();
  }

  getList(){
    this.service.getEducatorLesson(this.selectedEducatorId).subscribe((data)=>{
      if(data.success){
        console.log(data);
        this.tempEducatorLessionList = [];
        this.educatorLessonList = data.dynamicClass as EducatorLessonCurrentModel[];
       /* let firstClass: number = 0;
        let firstDate: Date = new Date();
        let firstFinishDate: Date = new Date();
        this.educatorLessonList.forEach(element => {
          if(element.classroomId !== firstClass && element.minStartDate !== firstDate && element.maxFinishDate !== firstFinishDate){
            firstClass = element.classroomId;
            firstDate = element.minStartDate;
            firstFinishDate = element.maxFinishDate;
            this.tempEducatorLessionList.push(element);
            this.studentCount++;
          }else{
            this.studentCount++;
          }
        });*/
      }
    }, (err)=>{

    })
  }

  openDetailList(unicStrId: string){
    this.router.navigate(['egitmen-islemleri/paket-seanslari.html/', unicStrId]);
  }

  openStudents(resource){
    this.service.selectedTeacherStudents =  resource.customerPackageBasicInfos;
    this.service.selectedCustomerLessons = resource.customerLessons;
    this.service.selectedLessonImage = resource.lessonPhoto;
    this.router.navigate(['egitmen-islemleri/ogrenciler.html/']);
  }

}
