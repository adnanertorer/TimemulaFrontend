import { Component, OnInit } from '@angular/core';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { VStaffsModel } from 'src/app/shared/model/v-staffs-model';
import { StaffService } from 'src/app/shared/services/staff.service';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-create-educator',
  templateUrl: './create-educator.component.html',
  styleUrls: ['./create-educator.component.css']
})
export class CreateEducatorComponent implements OnInit {

  staff: StaffModel;
  staffList: any[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;
  
  constructor(private service: StaffService) { }

  ngOnInit() {
    this.staff = {
      address: '',
      callenderOrder: 0,
      createdBy: 0,
      email: '',
      workFinishDateTime: null,
      workStarDateTime: new Date(),
      gsm: '',
      id: 0,
      identityNumber: '',
      name: '',
      salaryTypeId: 0,
      staffTypeId: 0,
      surname: '',
      birthDate: null,
      branchId: 0,
      isTeacher: false,
      salaryAmount: 0
    };
    this.getList();
  }

  getList(): void {
    this.service.getList().subscribe((data)=>{
      this.staffList = data.dynamicClass as any[];
      this.pageOfItems = this.staffList;
    })
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    //this.staff = resource;
    const id = resource.id;
    this.service.getDetails(id).subscribe((data)=>{
      if(data.success){
        this.staff = data.dynamicClass as StaffModel;
        this.buttonText = Constants.Update;
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
    })
  }

  add(): void {
    if(this.staff.id == 0){
      this.staff.identityNumber = this.staff.identityNumber.toString();
      this.service.add(this.staff).subscribe((data)=>{
        if(data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }else{
          alert(data.clientMessage);
        }
      });
    }else{
      this.staff.identityNumber = this.staff.identityNumber.toString();
      this.service.update(this.staff).subscribe((data)=>{
        if(data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }else{
          alert(data.clientMessage);
        }
      });
    }
  }

  remove(id: number): void {
   this.service.remove(id).subscribe((data)=>{
      if(data.success){
        alert(data.clientMessage);
        this.ngOnInit();
      }else{
        alert(data.clientMessage);
      }
    });
  }

  reset(): void {
   this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  parseDate(dateString: string) {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

}
