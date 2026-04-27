import { Component, OnInit } from '@angular/core';

import { Permission, Roles } from './shared/roles.model';
import { RolesService } from './shared/roles.service';
import Constants from 'src/app/shared/tools/constants';
declare let alertify: any;

@Component({
  selector: 'roles',
  templateUrl: 'roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [RolesService],
})
export class RolesComponent implements OnInit {
  roles: Roles[] = [];
  roleModel: Roles | undefined;
  permissions: Permission[] = [];
  selectedRole: Roles | undefined;
  selectedRolePermissionIds: number[] = [];
  buttonText = Constants.Save;
  isDetail: boolean = false;
  permissionModalOpen: boolean = false;

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    this.roleModel = {
      id: 0,
      name: '',
      code: '',
      permissions: [],
    };
    this.permissionModalOpen = false;
    this.selectedRole = undefined;
    this.selectedRolePermissionIds = [];
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
        this.roles = response.map((role) => this.normalizeRolePermissions(role));
      }
    });
  }

  openPermissionModal(role: Roles): void {
    role = this.normalizeRolePermissions(role);
    this.selectedRole = role;
    this.permissionModalOpen = true;
    this.selectedRolePermissionIds = (role.permissions || []).map((permission) => permission.id);
    this.getPermissions();
  }

  closePermissionModal(): void {
    this.permissionModalOpen = false;
    this.selectedRole = undefined;
    this.selectedRolePermissionIds = [];
  }

  getPermissions(): void {
    this.rolesService.getPermissions().subscribe((data) => {
      if (data.success) {
        this.permissions = data.dynamicClass as Permission[];
      }
    });
  }

  isPermissionSelected(permissionId: number): boolean {
    return this.selectedRolePermissionIds.indexOf(permissionId) > -1;
  }

  togglePermission(permission: Permission, event: Event): void {
    if (!this.selectedRole) {
      return;
    }

    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.addPermissionToRole(this.selectedRole, permission);
    } else {
      (event.target as HTMLInputElement).checked = true;
      alertify.set('notifier', 'position', 'top-right');
      alertify.error('Permission kaldırma endpointi backend tarafında bulunmuyor.', 2);
    }
  }

  addPermissionToRole(role: Roles, permission: Permission): void {
    this.rolesService.addRolePermission(role.id, permission).subscribe((data) => {
      if (data.success) {
        this.selectedRolePermissionIds.push(permission.id);
        role.permissions = role.permissions || [];
        role.rolePermissions = role.rolePermissions || [];
        if (!role.permissions.some((item) => item.id === permission.id)) {
          role.permissions.push(permission);
        }
        if (!role.rolePermissions.some((item) => item.permissionId === permission.id)) {
          role.rolePermissions.push({
            roleId: role.id,
            permissionId: permission.id,
            permission: permission,
          });
        }
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      }
    });
  }

  normalizeRolePermissions(role: Roles): Roles {
    role.permissions = role.permissions || (role.rolePermissions || [])
      .filter((rolePermission) => !!rolePermission.permission)
      .map((rolePermission) => rolePermission.permission);

    return role;
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

  remove(id: number): void {
    this.rolesService.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(data.clientMessage, 2);
      }
    });
  }
}
