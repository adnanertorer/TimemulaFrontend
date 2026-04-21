import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomModel } from '../../../shared/model/classroom-model';
import { StaffModel } from '../../../shared/model/staff-model';
import { SubService } from '../../../shared/model/sub-service';
import { SubServiceClassroom } from '../../../shared/model/sub-service-classroom';
import { SubServiceTeacherModel } from '../../../shared/model/sub-service-teacher-model';
import { VSubServiceClassroomModel } from '../../../shared/model/v-sub-service-classroom-model';
import { VSubserviceTeacher } from '../../../shared/model/v-subservice-teacher';
import { ClassroomService } from '../../../shared/services/classroom.service';
import { StaffService } from '../../../shared/services/staff.service';
import { SubServiceClassroomService } from '../../../shared/services/sub-service-classroom.service';
import { SubServiceTeacherService } from '../../../shared/services/sub-service-teacher.service';
import { SubServiceService } from '../../../shared/services/sub-service.service';
import Constants from 'src/app/shared/tools/constants';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
declare let alertify: any;

@Component({
  selector: 'app-sub-service',
  templateUrl: './sub-service.component.html',
  styleUrls: ['./sub-service.component.scss']
})
export class SubServiceComponent implements OnInit {

  subService: SubService;
  subServiceList: SubService[] = [];
  staffs: StaffModel[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  classroomButtonText = Constants.Save;
  teacherButtonText = Constants.Save;
  isUpdateClassroom: boolean = false;
  isUpdateTeacher: boolean = false;
  modalOpen:boolean = false;
  classroomModalOpen = false;
  teacherModalOpen = false;
  mainServiceId: number;
  classrooms: ClassroomModel[] = [];
  pageOfItemsSubServiceClassroom: Array<any>;
  subserviceClassroom: SubServiceClassroom;
  subServiceClassroomList: VSubServiceClassroomModel[] = [];
  subServiceId: number;
  subServiceTeacher: SubServiceTeacherModel;
  subServiceTeacherList: VSubserviceTeacher[] = [];
  pageOfItemsTeachers: Array<any>;
  constructor(private service: SubServiceService, private activatedRoute: ActivatedRoute,
    private classroomService: ClassroomService, private subServiceClassroomService: 
    SubServiceClassroomService, private staffService: StaffService, private teacherService:
    SubServiceTeacherService
    ) { }

  ngOnInit() {
    this.isUpdateClassroom = false;
    this.isUpdateTeacher = false;
    this.subServiceId = 0;
    this.modalOpen = false;
    this.classroomModalOpen = false;
    this.teacherModalOpen = false;
    this.buttonText = Constants.Save;
    this.classroomButtonText = Constants.Save;
    this.teacherButtonText = Constants.Save;
    this.subService = {
      createdBy: 0,
      id: 0,
      isAdult: true,
      isGroup: false,
      price: 0,
      serviceId: 0,
      subServiceName: "",
      durationMinute: 0
    };
    this.subserviceClassroom = {
      classroom_id: 0,
      created_by: 0,
      id: 0,
      priority: 0,
      sub_service_id: 0
    };
    this.subServiceTeacher = {
      created_by: 0,
      id: 0,
      priority: 0,
      staff_id: 0,
      sub_service_id: 0
    };
    this.activatedRoute.params.subscribe(params => {
      let id = parseInt(params["id"]);
      this.mainServiceId = id;
      this.getList(id);
    });
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  onChangePageClassroom(pageOfItems: any[]): void {
    this.pageOfItemsSubServiceClassroom = pageOfItems;
  }

  onChangePageTeacher(pageOfItems: any[]): void {
    this.pageOfItemsTeachers = pageOfItems;
  }

  getClassrooms(){
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 1000,
      isAllItems: false,
    };
    this.classroomService.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<ClassroomModel>;
      this.classrooms = response.dynamicClass.items as ClassroomModel[];
    })
  }

  getTeachers(){
    this.staffService.getTeachers().subscribe((data)=>{
      if(data.success){
        this.staffs = data.dynamicClass as StaffModel[];
      }
    })
  }

  getDetailFromTable(resource: any): void {
    this.subService = resource;
    this.buttonText = Constants.Update;
    this.modalOpen = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getDetailClassroom(resource: any): void {
    this.subserviceClassroom = resource;
    this.isUpdateClassroom = true;
    this.classroomButtonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getDetailTeacher(resource: any): void {
    this.subServiceTeacher = resource;
    this.isUpdateTeacher = true;
    this.teacherButtonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  resetClassroom(){
    this.isUpdateClassroom = false;
    this.subserviceClassroom = {
      classroom_id: 0,
      created_by: 0,
      id: 0,
      priority: 0,
      sub_service_id: 0
    };
    this.classroomButtonText = Constants.Save;
  }

  resetTeacher(){
    this.isUpdateTeacher = false;
    this.subServiceTeacher = {
      created_by: 0,
      id: 0,
      priority: 0,
      staff_id: 0,
      sub_service_id: 0
    };
    this.teacherButtonText = Constants.Save;
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    this.subService.price = parseFloat(this.subService.price.toString());
    this.subService.serviceId = parseInt(this.subService.serviceId.toString());
    this.subService.serviceId = this.mainServiceId;
    if (this.subService.id == 0) {
      this.service.add(this.subService).subscribe((data) => {
        if (data.success) {
          this.modalOpen = false;
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.subService).subscribe((data) => {
        if (data.success) {
          this.modalOpen = false;
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  addClassroom(): void {
    this.subserviceClassroom.priority = parseFloat(this.subserviceClassroom.priority.toString());
    this.subserviceClassroom.classroom_id = parseInt(this.subserviceClassroom.classroom_id.toString());
    this.subserviceClassroom.sub_service_id = this.subServiceId;
    if (this.subserviceClassroom.id == 0) {
      this.subServiceClassroomService.add(this.subserviceClassroom).subscribe((data) => {
        if (data.success) {
          this.getSubServiceClassroomList(this.subServiceId);
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.subServiceClassroomService.update(this.subserviceClassroom).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          this.getSubServiceClassroomList(this.subServiceId);
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  addTeacher(): void {
    this.subServiceTeacher.priority = parseFloat(this.subServiceTeacher.priority.toString());
    this.subServiceTeacher.staff_id = parseInt(this.subServiceTeacher.staff_id.toString());
    this.subServiceTeacher.sub_service_id = this.subServiceId;
    if (this.subServiceTeacher.id == 0) {
      this.teacherService.add(this.subServiceTeacher).subscribe((data) => {
        if (data.success) {
          this.getSubServiceTeacherList(this.subServiceId);
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.teacherService.update(this.subServiceTeacher).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          this.getSubServiceTeacherList(this.subServiceId);
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  getList(id: number): void {
    this.service.getList(id).subscribe((data) => {
      this.subServiceList = data.dynamicClass as SubService[];
      this.pageOfItems = this.subServiceList;
    })
  }

  getSubServiceClassroomList(id: number){
    this.subServiceClassroomService.getList(id).subscribe((data) => {
      this.subServiceClassroomList = data.dynamicClass as VSubServiceClassroomModel[];
      this.pageOfItemsSubServiceClassroom = this.subServiceClassroomList;
    })
  }

  getSubServiceTeacherList(id: number){
    this.teacherService.getList(id).subscribe((data) => {
      this.subServiceTeacherList = data.dynamicClass as VSubserviceTeacher[];
      this.pageOfItemsTeachers = this.subServiceTeacherList;
    })
  }

  openModal(){
    this.modalOpen =  true;
  }

  openClassroomModal(id: number){
    this.subServiceId = id;
    this.isUpdateClassroom = false;
    this.classroomButtonText = Constants.Save;
    this.getClassrooms();
    this.getSubServiceClassroomList(this.subServiceId);
    this.classroomModalOpen = true;
  }

  openTeacherModal(id: number){
    this.teacherModalOpen = true;
    this.subServiceId = id;
    this.isUpdateTeacher = false;
    this.teacherButtonText = Constants.Save;
    this.getTeachers();
    this.getSubServiceTeacherList(this.subServiceId);
    
  }

  closeClassroomModal(){
    this.isUpdateClassroom = false;
    this.subserviceClassroom = {
      classroom_id: 0,
      created_by: 0,
      id: 0,
      priority: 0,
      sub_service_id: 0
    };
    this.classroomModalOpen = false;
  }

  closeTeacherModal(){
    this.isUpdateTeacher = false;
    this.subServiceTeacher = {
      created_by: 0,
      id: 0,
      priority: 0,
      staff_id: 0,
      sub_service_id: 0
    };
    this.teacherModalOpen = false;
  }

  closeModal(){
    this.subService = {
      createdBy: 0,
      id: 0,
      isAdult: true,
      isGroup: false,
      price: 0,
      serviceId: 0,
      subServiceName: ""
    };
    this.modalOpen = false;
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

  removeClassroom(id: number): void {
    this.subServiceClassroomService.remove(id).subscribe((data) => {
      if (data.success) {
        this.getSubServiceClassroomList(this.subServiceId);
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

  removeTeacher(id: number): void {
    this.teacherService.remove(id).subscribe((data) => {
      if (data.success) {
        this.getSubServiceTeacherList(this.subServiceId);
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

}
