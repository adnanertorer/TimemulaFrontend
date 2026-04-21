import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private subscription: Subscription;
  private readonly accessTokenName = `${environment.access_token_name}`;
  private readonly refreshTokeName = `${environment.refresh_token_name}`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
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
}
