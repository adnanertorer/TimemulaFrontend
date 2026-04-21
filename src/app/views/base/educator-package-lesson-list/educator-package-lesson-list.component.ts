import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VEducatorLessonSessionModel } from 'src/app/shared/model/v-educator-lesson-session-model';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';

@Component({
  selector: 'app-educator-package-lesson-list',
  templateUrl: './educator-package-lesson-list.component.html',
  styleUrls: ['./educator-package-lesson-list.component.css']
})
export class EducatorPackageLessonListComponent implements OnInit {

  lessonList: VEducatorLessonSessionModel[] = [];
  constructor(private service: LessonEducatorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.getList(id);
    });
  }

  getList(strUnicId: string){
    this.service.getSeassions(strUnicId).subscribe((data)=>{
      if(data.success){
        this.lessonList = data.dynamicClass as VEducatorLessonSessionModel[];
      }else{
        alert(data.clientMessage);
      }
    })
  }

}
