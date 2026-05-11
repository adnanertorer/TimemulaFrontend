import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared';
import { StatusModel } from 'src/app/shared/model/status-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

   constructor(
        private router: Router,
        private authService: AuthService,
        private elementRef: ElementRef
      ) {}

      
  public sidebarMinimized = false;
  public navItems = navItems;
  private routerSubscription: Subscription;

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenus();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }

  canAccessAny(permissionCodes: string[]): boolean {
    return this.authService.hasAnyPermission(permissionCodes);
  }

  @HostListener('click', ['$event'])
  onLayoutClick(event: MouseEvent): void {
    const target = event.target as Element;
    if (target?.closest?.('.menu-link')) {
      window.setTimeout(() => this.closeMenus());
    }
  }

  closeMenus(): void {
    const openMenus = this.elementRef.nativeElement.querySelectorAll('details[open]');
    openMenus.forEach((menu: HTMLDetailsElement) => menu.removeAttribute('open'));
  }

  logout(){
    this.closeMenus();
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
