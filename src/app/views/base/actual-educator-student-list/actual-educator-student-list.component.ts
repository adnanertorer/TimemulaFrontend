import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EducatorLessonCurrentModel } from 'src/app/shared/model/educator-lesson-current-model';
import { VActualEducatorStudents } from 'src/app/shared/model/v-actual-educator-students';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-actual-educator-student-list',
  templateUrl: './actual-educator-student-list.component.html',
  styleUrls: ['./actual-educator-student-list.component.css']
})
export class ActualEducatorStudentListComponent implements OnInit {

  displayedColumns: string[] = ['categoryName', 'artPackageName', 'name', 'startDate',
  'finishDate', 'customerId'];
    dataSource: MatTableDataSource<EducatorLessonCurrentModel>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    customerList: VActualEducatorStudents[] = [];
    educatorName: string = '';
    constructor(private router: Router, private service: StaffService) { }

  ngOnInit() {
    console.log(this.service.basicList);
    this.educatorName = this.service.basicList[0].educatorName;
    this.dataSource = new MatTableDataSource(this.service.basicList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProgram(customerId: number){
    const list = this.service.customerLessons.filter(i=>i.customerId == customerId);
    const unicKey = list[0].unicStrId;
    this.router.navigate(['actual-hareketler/ogrenci-paket-icerigi.html', customerId, unicKey]);
  }

}
