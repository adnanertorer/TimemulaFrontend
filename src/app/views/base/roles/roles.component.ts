import { Component, OnInit } from '@angular/core';

import { Roles } from './shared/roles.model';
import { RolesService } from './shared/roles.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'roles',
  templateUrl: 'roles.component.html',
  providers: [RolesService],
})
export class RolesComponent implements OnInit {
  roles: Roles[] = [];
  roleModel: Roles | undefined;
  buttonText = Constants.Save;
  isDetail: boolean = false;

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    this.roleModel = {
      id: 0,
      name: '',
      code: '',
    };
    this.getList();
  }

  getDetailFromTable(resource: any): void {
    this.roleModel = resource;
    this.buttonText = Constants.Update;
    this.isDetail = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  reset(): void {
    this.buttonText = Constants.Save;
    this.isDetail = false;
    this.ngOnInit();
  }

  getList(): void {
    this.rolesService.getList().subscribe((data) => {
      if (data.success) {
        const response = data.dynamicClass as Roles[];
        this.roles = response;
      }
    });
  }

  add(): void {
    if (!this.isDetail) {
      if (this.roleModel) {
        this.rolesService.add(this.roleModel).subscribe((data) => {
          if (data.success) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
			this.ngOnInit();
          }
        });
      }
    }else{
      if (this.roleModel) {
        this.rolesService.update(this.roleModel).subscribe((data) => {
          if (data.success) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
            this.ngOnInit();
          }
        });
      }
    }
  }
}
