import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicationUser, AuthService } from '../../shared';

@Component({
  selector: 'app-main-report',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  busy = false;
  loginError = false;
  user: ApplicationUser;
  private subscription: Subscription;
  private readonly accessTokenName = `${environment.access_token_name}`;
  private readonly refreshTokeName = `${environment.refresh_token_name}`;
  returnClientMessage:string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = {
      accessToken: '',
      email: '',
      fullName: '',
      password: '',
      refreshToken: ''
    };

    this.subscription = this.authService.user$.subscribe((x) => {
      if (this.route.snapshot.url.length > 0){
        if (this.route.snapshot.url[0].path === '') {
          const accessToken = localStorage.getItem(this.accessTokenName);
          const refreshToken = localStorage.getItem(this.refreshTokeName);
          if (x && accessToken && refreshToken) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'genel-rapor.html';
            this.router.navigate([returnUrl]);
          }
        }
      }

    });
  }

  register(){
    this.router.navigate(['register']);
  }

  goResetPassword(){
    this.router.navigate(['forgot-password']);
  }
  
  login() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'genel-rapor.html';
    this.authService
      .login(this.user)
      .subscribe(
        (data) => {
          if(data.success){
            this.loginError = false;
            this.returnClientMessage = data.clientMessage;
            this.router.navigate([returnUrl]);
          }else{
            this.returnClientMessage = data.clientMessage;
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
