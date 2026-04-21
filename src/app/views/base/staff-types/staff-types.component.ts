import { Component, OnInit } from '@angular/core';
import { StaffType } from '../../../shared/model/staff-type';
import { StaffTypeService } from '../../../shared/services/staff-type.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'app-staff-types',
  templateUrl: './staff-types.component.html',
  styleUrls: ['./staff-types.component.scss']
})
export class StaffTypesComponent implements OnInit {

  staffType: StaffType;
  staffTypes: StaffType[] = [];
  pageOfItems: Array<any>;
  buttonText = Constants.Save;

  constructor(private service: StaffTypeService) { }

  ngOnInit() {
    this.staffType = {
      created_by: 0,
      id: 0,
      staffTypeName: ''
    };
    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.staffType = resource;
    this.buttonText = Constants.Update;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.ngOnInit();
  }

  add(): void {
    if (this.staffType.id == 0) {
      this.service.add(this.staffType).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.staffType).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  getList(): void {
    this.service.getList().subscribe((data) => {
      this.staffTypes = data.dynamicClass as StaffType[];
      this.pageOfItems = this.staffTypes;
    })
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


}
