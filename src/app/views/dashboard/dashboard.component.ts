import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
  }

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }
}
