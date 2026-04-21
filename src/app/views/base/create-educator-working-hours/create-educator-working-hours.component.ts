import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EducatorDaysHoursModel } from 'src/app/shared/model/educator-days-hours-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { EducatorDaysHoursService } from 'src/app/shared/services/educator-days-hours.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import Constants from 'src/app/shared/tools/constants';
import { daysEnum } from 'src/environments/environment';

@Component({
  selector: 'app-create-educator-working-hours',
  templateUrl: './create-educator-working-hours.component.html',
  styleUrls: ['./create-educator-working-hours.component.css']
})
export class CreateEducatorWorkingHoursComponent implements OnInit {

  model: EducatorDaysHoursModel;
  list: EducatorDaysHoursModel[] = [];
  staffList: StaffModel[] = [];
  buttonText: string = Constants.Save;
  displayColums: string[] = ['educatorId', 'dayName', 'startTime', 'finishTime', 'id'];
  dataSource: MatTableDataSource<EducatorDaysHoursModel>;

  @ViewChild('paginatorEducator') paginator: MatPaginator;
  @ViewChild('educatorSort') sort: MatSort;
  
  public weekDays: daysEnum[] = [daysEnum.Pazartesi, daysEnum.Sali, daysEnum.Carsamba, daysEnum.Persembe, daysEnum.Cuma, daysEnum.Cumartesi, daysEnum.Pazar];
  public dayLabels = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  constructor(private service: EducatorDaysHoursService, private staffService: StaffService) { }

  ngOnInit() {
    this.buttonText = Constants.Save;
    this.model = {
      createdAt: new Date(),
      createdBy: 0,
      day: 0,
      educatorId: 0,
      finishTime: '',
      id: 0,
      startTime: ''
    };
    this.getEducators();
    this.getList();
  }

  getList(){
    this.service.getList().subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as EducatorDaysHoursModel[];
        this.list.forEach(element => {
          this.staffService.getDetails(element.educatorId).subscribe((data)=>{
            if(data.success){
              const staff = data.dynamicClass as StaffModel;
              element.educatorName = staff.name+' '+staff.surname;
            }
          });
          element.dayName = this.dayLabels[element.day];
        });
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEducators(){
    this.staffService.getTeachers().subscribe((data)=>{
      if(data.success){
        this.staffList = data.dynamicClass as StaffModel[];
      }
    })
  }

  getEducatorName(id){
    this.staffService.getDetails(id).subscribe((data)=>{
      if(data.success){
        const staff = data.dynamicClass as StaffModel;
        return staff.name+' '+staff.surname;
      }
    });
  }

  getDetail(id){
    this.service.getDetails(id).subscribe((data)=>{
      if(data.success){
        this.model = data.dynamicClass as EducatorDaysHoursModel;
        this.buttonText = Constants.Update;
      }
    })
  }
  

  add(){
    this.model.day = parseInt(this.model.day.toString());
    this.model.educatorId = parseInt(this.model.educatorId.toString());
    if(this.model.id == 0){
      this.service.add(this.model).subscribe((data)=>{
        if(data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }
      })
    }else{
      this.service.update(this.model).subscribe((data)=>{
        if(data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }
      })
    }
  }

  reset(){
    this.ngOnInit();
  }

}
