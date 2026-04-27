import { Injectable } from '@angular/core';
// tslint:disable-next-line: import-spacing
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree }
 from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private router: Router, private authService: AuthService){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
        return this.authService.user$.pipe(
            map((user) => {
                if (!user){
                    this.router.navigate(['login'], {
                        queryParams: { returnUrl: state.url },
                    });
                    return false;
                }

                if (!this.canAccessUrl(state.url)) {
                    this.router.navigate(['404']);
                    return false;
                }

                return true;
            })
        );
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

    private canAccessUrl(url: string): boolean {
        const permissionCode = this.getPermissionCodeByUrl(url);
        return !permissionCode || this.authService.hasPermission(permissionCode);
    }

    private getPermissionCodeByUrl(url: string): string {
        const path = url.split('?')[0].replace(/^\//, '');
        const routePermissions = [
            { path: 'genel-tanimlar/kategoriler.html', permission: 'Categories' },
            { path: 'genel-tanimlar/alt-kategoriler.html', permission: 'SubCategories' },
            { path: 'genel-tanimlar/paketler.html', permission: 'Packages' },
            { path: 'genel-tanimlar/arama-motorlari.html', permission: 'SearchEngines' },
            { path: 'genel-tanimlar/personel-tipleri.html', permission: 'StaffTypes' },
            { path: 'genel-tanimlar/bayi-tanimlari.html', permission: 'Branches' },
            { path: 'genel-tanimlar/hizmetler.html', permission: 'Lessons' },
            { path: 'genel-tanimlar/dersler.html', permission: 'Lessons' },
            { path: 'genel-tanimlar/alt-hizmetler.html', permission: 'Lessons' },
            { path: 'genel-tanimlar/derslikler.html', permission: 'Classrooms' },
            { path: 'genel-tanimlar/ders-sinif-iliskisi.html', permission: 'LessonClassrooms' },
            { path: 'genel-tanimlar/hizmet-calisan-iliskisi.html', permission: 'LessonStaffs' },
            { path: 'genel-tanimlar/ebeveynler.html', permission: 'FamilyMembers' },
            { path: 'genel-tanimlar/genel-saglik-sorunlari.html', permission: 'Health' },
            { path: 'genel-tanimlar/genel-saglik-sorunlari-alt-basliklar.html', permission: 'Health' },
            { path: 'genel-tanimlar/musteri-saglik-bilgileri.html', permission: 'Health' },
            { path: 'musteri-islemleri/paket-ekle.html', permission: 'PackageModule' },
            { path: 'musteri-islemleri/randevu-girisi.html', permission: 'Booking' },
            { path: 'egitmen-islemleri/dersler.html', permission: 'StaffLessonList' },
            { path: 'personeller', permission: 'Staffs' },
            { path: 'musteriler', permission: 'Customers' },
            { path: 'actual-hareketler/egitmen-listesi.html', permission: 'StaffPayments' },
            { path: 'genel-tanimlar/egitmen-mesaileri.html', permission: 'StaffWorkDays' },
            { path: 'finansal-tanimlar/kasa-tanimlari.html', permission: 'CashBox' },
            { path: 'finansal-tanimlar/kasa-hareketleri.html', permission: 'CashBoxTransactions' },
            { path: 'cari-hesaplar/hesap-hareketleri.html', permission: 'AccountTransactions' },
            { path: 'finansal-tanimlar/hakedis-hareketleri.html', permission: 'StaffPaymentTransactions' },
            { path: 'cari-hesaplar/tahsilat-formu.html', permission: 'CollectionTransactions' },
            { path: 'cari-hesaplar/vadeli-alacak-tahsilati.html', permission: 'CollectionTransactions' },
            { path: 'cari-hesaplar/musteri-taksit-listesi.html', permission: 'CollectionTransactions' },
            { path: 'cari-hesaplar/odeme-formu.html', permission: 'PaymentForm' },
            { path: 'cari-hesaplar/tedarikciler.html', permission: 'Suppliers' },
            { path: 'urunler', permission: 'Products' },
            { path: 'urunler-islemleri', permission: 'ProductTransactions' },
        ];

        const routePermission = routePermissions.find((item) => path === item.path || path.indexOf(item.path + '/') === 0);
        return routePermission ? routePermission.permission : '';
    }
}
