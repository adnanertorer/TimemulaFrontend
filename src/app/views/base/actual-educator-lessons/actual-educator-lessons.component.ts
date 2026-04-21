import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EducatorLessonCurrentModel } from 'src/app/shared/model/educator-lesson-current-model';
import { EducatorStudentsFilterResource } from 'src/app/shared/model/educator-students-filter-resource';
import { VEducatorCurrentLessonModel } from 'src/app/shared/model/v-educator-current-lesson-model';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';
import { StaffService } from 'src/app/shared/services/staff.service';
declare let alertify: any;

@Component({
  selector: 'app-actual-educator-lessons',
  templateUrl: './actual-educator-lessons.component.html',
  styleUrls: ['./actual-educator-lessons.component.css']
})
export class ActualEducatorLessonsComponent implements OnInit {

  displayedColumns: string[] = ['lessonName', 'classromName', 'firstLessonDate', 'lastLessonDate',
  'totalCustomer', 'id' ];
    dataSource: MatTableDataSource<EducatorLessonCurrentModel>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
 
  educatorLessonList: EducatorLessonCurrentModel[] = [];
  selectedEducatorId: number = 0;
  isOpen: boolean = false;
  educatorName: string = '';
  filterResource: EducatorStudentsFilterResource;
  constructor(private service: LessonEducatorService,
    private router: Router, private activateRoute: ActivatedRoute, private staffService: StaffService) { }

  ngOnInit() {
    this.filterResource = {
      finishDate: new Date(),
      id: 0,
      packageId: 0,
      startDate: new Date()
    };
    this.activateRoute.params.subscribe(params => {
      const id = params["id"];
      this.selectedEducatorId = parseInt(id);
      this.service.getEducatorLesson(this.selectedEducatorId).subscribe((data)=>{
        if(data.success){
          this.educatorLessonList = data.dynamicClass as EducatorLessonCurrentModel[];
          this.educatorName = this.educatorLessonList[0].name+' '+this.educatorLessonList[0].surname;
          this.dataSource = new MatTableDataSource(this.educatorLessonList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }, (err)=>{
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(err, 2);
      })
    });
  }

  getList(){
    this.service.getEducatorLesson(this.selectedEducatorId).subscribe((data)=>{
      if(data.success){
        this.educatorLessonList = data.dynamicClass as EducatorLessonCurrentModel[];
        this.dataSource = new MatTableDataSource(this.educatorLessonList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }, (err)=>{
      alertify.set('notifier', 'position', 'top-right');
      alertify.error(err, 2);
    })
  }

  openStudents(lessonModel: EducatorLessonCurrentModel){
    console.log(lessonModel);
    this.staffService.basicList = lessonModel.customerPackageBasicInfos;
    this.staffService.customerLessons = lessonModel.customerLesson;
    this.router.navigate(['actual-hareketler/egitmen-ogrencileri.html']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
