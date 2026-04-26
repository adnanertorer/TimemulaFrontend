import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Permission, Roles } from './roles.model';
import { BaseResponse } from 'src/app/shared/model/BaseResponse';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class RolesService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  add(resource: Roles) {
    return this.http
      .post<BaseResponse>(`${this.apiUrl}/User/AddRole`, resource)
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

   update(resource: Roles) {
    return this.http
      .put<BaseResponse>(`${this.apiUrl}/User/Roles`, resource)
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

  getList() {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/User/Roles`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

  remove(id: number) {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/User/RemoveRole?id=${id.toString()}`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

  getPermissions() {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/User/PermissionList`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

  getRolePermissions(roleId: number) {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/User/RolePermissionList?id=${roleId.toString()}`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

  addRolePermission(roleId: number, permission: Permission) {
    return this.http
      .post<BaseResponse>(`${this.apiUrl}/User/AddPermissionToRole`, {
        roleId: roleId,
        permissionId: permission.id,
      })
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }

  removeRolePermission(roleId: number, permissionId: number) {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/User/RemoveRolePermission?roleId=${roleId.toString()}&permissionId=${permissionId.toString()}`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        }),
      );
  }
}
