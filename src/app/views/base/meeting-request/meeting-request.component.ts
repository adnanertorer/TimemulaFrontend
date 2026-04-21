import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { MeetingRequestModel } from 'src/app/shared/model/meeting-request-model';
import { SelectItemModel } from 'src/app/shared/model/select-item-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { MeetingRequestService } from 'src/app/shared/services/meeting-request.service';
import { StaffService } from 'src/app/shared/services/staff.service';
declare let alertify: any;

@Component({
  selector: 'app-meeting-request',
  templateUrl: './meeting-request.component.html',
  styleUrls: ['./meeting-request.component.css']
})
export class MeetingRequestComponent implements OnInit {
  model: MeetingRequestModel;
  list: MeetingRequestModel[] = [];
  staffList: StaffModel[] = [];
  displayedColumns: string[] = ['requestByName', 'meetingDate', 'title', 'requestDescription', 'createdAt', 'name', 'isDone', 'id'];
  dataSource = new MatTableDataSource<MeetingRequestModel>()
  @ViewChild('meetingPaginator') paginator: MatPaginator;
  @ViewChild('meetingSort') sort: MatSort;
  buttonText: string = '';
  isVisibleCancelButton = false;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  @ViewChild('date')
  public Date: DatePickerComponent;
  
  public dateValue: Date = new Date();
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public minDate: Date = new Date(this.fullYear, this.month , 7);
  public maxDate: Date = new Date(this.fullYear, this.month, 27);

  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  timeLast: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

  constructor(private service: MeetingRequestService, private staffService: StaffService) { }

  ngOnInit() {
    this.buttonText = 'Kaydet';
    this.isVisibleCancelButton = false;
    this.model = {
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      isDone: false,
      meetingDate: new Date(),
      requestByName: '',
      requestDescription: '',
      title: '',
      relationStaff: 0
    };
    this.getList();
    this.getAdminList();
  }

  getAdminList(){
    this.staffService.getList().subscribe((data)=>{
      if(data.success){
        this.staffList = data.dynamicClass as StaffModel[];
      }
    })
  }

  onDateChange(){
    this.dateValue = this.Date.value;
  }

  reset(){
    this.ngOnInit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList(){
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getList(pageRequest).subscribe((data)=>{
      if(data.success){
        const response = data as PaginateResponse<MeetingRequestModel>;
        this.list = response.dynamicClass.items as MeetingRequestModel[];
        this.dataSource.data = this.list;
        this.paginator.pageIndex = this.pageIndex;
        this.paginator.length = this.total;
      }
    })
  }

  getDetail(resource: MeetingRequestModel){
    this.model = resource;
    this.isVisibleCancelButton = true;
    this.buttonText = 'Güncelle';
    this.dateValue = new Date(resource.meetingDate);
    this.time = {hour: new Date(resource.meetingDate).getHours(), minute: new Date(resource.meetingDate).getMinutes(), second: 0};
  }

  addOrUpdate(){
    if(this.model.id == 0){
      this.add();
    }else{
      this.update();
    }
  }

  add(){
    this.model.relationStaff = parseInt(this.model.relationStaff.toString());
    this.model.meetingDate = new Date(this.dateValue.getFullYear(), this.dateValue.getMonth(), this.dateValue.getDate(),this.time.hour, this.time.minute, 0, 0);
    this.service.add(this.model).subscribe((data)=>{
      if(data.success){
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Randevu kaydedildi', 2);
        this.ngOnInit();
      }else{
        alertify.error('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2); 
      }
    })
  }

  remove(id: number){
    this.service.remove(id).subscribe((data)=>{
      if(data.success){
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Randevu silindi', 2);
        this.ngOnInit();
      }else{
        alertify.error('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2); 
      }
    })
  }

  update(){
    this.model.meetingDate = new Date(this.dateValue.getFullYear(), 
    this.dateValue.getMonth(), this.dateValue.getDate(),this.time.hour, this.time.minute, 0, 0);
    this.service.update(this.model).subscribe((data)=>{
      if(data.success){
        alertify.set('notifier', 'position', 'top-right');
        alertify.success('Randevu güncellendi', 2);
        this.ngOnInit();
      }else{
        alertify.error('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2); 
      }
    })
  }

   onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

}
