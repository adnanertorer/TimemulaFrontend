import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApplicationUser } from '../model/application-user';
import { BaseResponse } from '../model/BaseResponse';
import { TokenModel } from '../model/TokenModel';
import { RegisterCompanyModel } from '../model/register-company-model';
import { ForgotPasswordModel } from '../model/forgot-password-model';
import { ResetPasswordModel } from '../model/reset-password-model';
import { UpdatePasswordModel } from '../model/update-password-model';

interface RegisterResult {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

interface RegisterCompanyResult {
  name: string;
  surname: string;
  email: string;
  companyId: number;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly apiUrl = `${environment.apiUrl}`;
  private readonly accessTokenName = `${environment.access_token_name}`;
  private readonly refreshTokeName = `${environment.refresh_token_name}`;
  private readonly permissionCodesName = `${environment.permission_codes_name}`;
  private readonly logoutEvent = `${environment.logout_event_name}`;
  // tslint:disable-next-line: variable-name
  private readonly access_time = `${environment.access_time}`;
  private timer: Subscription;
  // tslint:disable-next-line: variable-name
  public _user = new BehaviorSubject<ApplicationUser>(null);
  user$: Observable<ApplicationUser> = this._user.asObservable();

  // tslint:disable-next-line: typedef
  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === this.logoutEvent) {
        this._user.next(null);
      }
      if (event.key === this.logoutEvent) {
        location.reload();
      }
    }
  }

  constructor(private router: Router, private http: HttpClient) {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  // tslint:disable-next-line: typedef
  login(resource: ApplicationUser) {
    return this.http
      .post<BaseResponse>(`${this.apiUrl}/User/Login`, resource)
      .pipe(
        map((x) => {
          const response = x as BaseResponse;
          const tokenModel = response.dynamicClass as TokenModel;
          this._user.next({
            email: tokenModel.email,
            accessToken: tokenModel.token,
            refreshToken: tokenModel.refreshToken,
            password: '',
            fullName: tokenModel.fullName,
            roles: tokenModel.roles || [],
          });
          this.setLocalStorage(tokenModel);
          this.startTokenTimer();
          return { response: x, tokenModel: tokenModel };
        }),
        switchMap((result) => {
          return this.setPermissionCodes(result.tokenModel).pipe(
            map(() => result.response)
          );
        })
      );
  }

  register(
    name: string,
    surname: string,
    email: string,
    password: string,
    address: string,
    phone: string
  ) {
    return this.http
      .post<RegisterResult>(`${this.apiUrl}/User//CreateUser`, {
        name,
        surname,
        email,
        password,
        address,
        phone,
      })
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  registerCompany(model: RegisterCompanyModel) {
    return this.http
      .post<any>(`${this.apiUrl}/User/Register`, model)
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  sendForgotPasswordRequest(forgotPasswordModel: ForgotPasswordModel) {
    return this.http
      .post<BaseResponse>(`${this.apiUrl}/User/SendResetEmail`, forgotPasswordModel)
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  resetPasswordRequest(resetPasswordModel: ResetPasswordModel) {
    return this.http
      .post<BaseResponse>(`${this.apiUrl}/User/ResetPasswordWithEmail`, resetPasswordModel)
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  updatePasswordRequest(userPasswordResource: UpdatePasswordModel){
    return this.http
    .post<BaseResponse>(`${this.apiUrl}/User/UpdatePassword`, userPasswordResource)
    .pipe(
      map((x) => {
        return x;
      })
    );
  }


  logout() {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/User/logout`, {})
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokeName);
    if (!refreshToken) {
      this.clearLocalStorage();
      return of(null);
    }

    let refreshRequest: ApplicationUser = {
      refreshToken: refreshToken,
      accessToken: '',
      email: '',
      fullName: '',
      password: '',
    };

    return this.http
      .post<BaseResponse>(
        `${this.apiUrl}/User/RefreshToken`,
        refreshRequest
      )
      .pipe(
        map((x) => {
          var response = x as BaseResponse;
          var tokenModel = response.dynamicClass as TokenModel;
          this._user.next({
            email: '',
            accessToken: tokenModel.token,
            refreshToken: tokenModel.refreshToken,
            password: '',
            fullName: tokenModel.fullName,
            roles: tokenModel.roles || [],
          });
          this.setLocalStorage(tokenModel);
          return { response: x, tokenModel: tokenModel };
        }),
        switchMap((result) => {
          return this.setPermissionCodes(result.tokenModel, true).pipe(
            map(() => result.response)
          );
        })
      );
  }

  public setLocalStorage(x: TokenModel) {
    try {
      localStorage.setItem(this.accessTokenName, x.token);
      localStorage.setItem(this.refreshTokeName, x.refreshToken);
    } catch (error) {
      console.error(error);
    }
  }

  public clearLocalStorage() {
    localStorage.removeItem(this.accessTokenName);
    localStorage.removeItem(this.refreshTokeName);
    localStorage.removeItem(this.permissionCodesName);
    localStorage.removeItem(this.access_time);
    localStorage.setItem(this.logoutEvent, 'logout' + Math.random());
  }

  public getPermissionCodes(): string[] {
    const permissionCodes = localStorage.getItem(this.permissionCodesName);
    if (!permissionCodes) {
      return [];
    }

    try {
      return JSON.parse(permissionCodes) as string[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public hasPermission(permissionCode: string): boolean {
    if (!permissionCode) {
      return true;
    }

    return this.getPermissionCodes().indexOf(permissionCode) > -1;
  }

  public hasAnyPermission(permissionCodes: string[]): boolean {
    if (!permissionCodes || permissionCodes.length === 0) {
      return true;
    }

    const userPermissionCodes = this.getPermissionCodes();
    return permissionCodes.some((permissionCode) => userPermissionCodes.indexOf(permissionCode) > -1);
  }

  private setPermissionCodes(tokenModel: TokenModel, keepExistingIfEmpty: boolean = false): Observable<void> {
    const permissions = this.getPermissionCodesFromToken(tokenModel);

    if (permissions.length > 0) {
      localStorage.setItem(this.permissionCodesName, JSON.stringify(permissions));
      return of(null);
    }

    if (tokenModel.userId) {
      return this.http
        .get<BaseResponse>(`${this.apiUrl}/User/UserPermissionList?userId=${tokenModel.userId}`)
        .pipe(
          map((response) => {
            if (response.success) {
              const permissionCodes = ((response.dynamicClass || []) as any[])
                .map((permission) => permission.code || permission.Code)
                .filter((permissionCode, index, permissionCodes) => permissionCode && permissionCodes.indexOf(permissionCode) === index);

              if (permissionCodes.length > 0 || !keepExistingIfEmpty) {
                localStorage.setItem(this.permissionCodesName, JSON.stringify(permissionCodes));
              }
            }
          })
        );
    }

    if (keepExistingIfEmpty && this.getPermissionCodes().length > 0) {
      return of(null);
    }

    localStorage.setItem(this.permissionCodesName, JSON.stringify([]));
    return of(null);
  }

  private getPermissionCodesFromToken(tokenModel: TokenModel): string[] {
    const roles = tokenModel.roles || (tokenModel as any).Roles || [];
    return roles
      .reduce((items, role) => items.concat(role.permissions || role.Permissions || []), [])
      .map((permission) => permission.code || permission.Code)
      .filter((permissionCode, index, permissionCodes) => permissionCode && permissionCodes.indexOf(permissionCode) === index);
  }

  private getTokenRemainTime() {
    const accessToken = localStorage.getItem(this.accessTokenName);
    if (!accessToken) {
      return 0;
    }
    const timer = localStorage.getItem(this.access_time);
    // const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    // const expires = new Date(timer * 1000);
    console.log(Date.now() - Date.parse(timer));
    return Date.now() - Date.parse(timer);
  }

  public startTokenTimer() {
    const timeout = this.getTokenRemainTime();
    this.timer = of(true)
      .pipe(
        delay(timeout),
        tap(() => this.refreshToken().subscribe())
      )
      .subscribe();
  }

  public stopTokenTimer() {
    this.timer?.unsubscribe();
  }
}
