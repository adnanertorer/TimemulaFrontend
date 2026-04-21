import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
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
          });
          this.setLocalStorage(tokenModel);
          this.startTokenTimer();
          return x;
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
          });
          this.setLocalStorage(tokenModel);
          return x;
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
    localStorage.removeItem(this.access_time);
    localStorage.setItem(this.logoutEvent, 'logout' + Math.random());
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
