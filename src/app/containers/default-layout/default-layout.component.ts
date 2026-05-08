import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared';
import { StatusModel } from 'src/app/shared/model/status-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

   constructor(
        private router: Router,
        private authService: AuthService
      ) {}

      
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }

  canAccessAny(permissionCodes: string[]): boolean {
    return this.authService.hasAnyPermission(permissionCodes);
  }

  logout(){
    this.authService
      .logout().subscribe((data)=>{
        if(data.success){
          const result = data.dynamicClass as StatusModel;
          if(result.status){
            this.authService._user.next(null);
            this.authService.clearLocalStorage();
            this.authService.stopTokenTimer();
            this.router.navigate(['login']);
          }else{
            alert('Oturumunuz kapatılamadı. Lütfen tekrar deneyin.');
          }
        }
      });
  }
}
