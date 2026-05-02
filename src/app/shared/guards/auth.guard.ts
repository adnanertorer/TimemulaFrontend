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
            { path: 'genel-tanimlar/kategoriler.html', permission: 'Category' },
            { path: 'genel-tanimlar/alt-kategoriler.html', permission: 'SubCategory' },
            { path: 'genel-tanimlar/paketler.html', permission: 'Package' },
            { path: 'genel-tanimlar/arama-motorlari.html', permission: 'SearchEngine' },
            { path: 'genel-tanimlar/personel-tipleri.html', permission: 'StaffType' },
            { path: 'genel-tanimlar/bayi-tanimlari.html', permission: 'Branche' },
            { path: 'genel-tanimlar/hizmetler.html', permission: 'Lesson' },
            { path: 'genel-tanimlar/dersler.html', permission: 'Lesson' },
            { path: 'genel-tanimlar/alt-hizmetler.html', permission: 'Lesson' },
            { path: 'genel-tanimlar/derslikler.html', permission: 'Classroom' },
            { path: 'genel-tanimlar/ders-sinif-iliskisi.html', permission: 'LessonClassroom' },
            { path: 'genel-tanimlar/hizmet-calisan-iliskisi.html', permission: 'LessonStaff' },
            { path: 'genel-tanimlar/ebeveynler.html', permission: 'FamilyMember' },
            { path: 'genel-tanimlar/genel-saglik-sorunlari.html', permission: 'Health' },
            { path: 'genel-tanimlar/genel-saglik-sorunlari-alt-basliklar.html', permission: 'Health' },
            { path: 'genel-tanimlar/musteri-saglik-bilgileri.html', permission: 'Health' },
            { path: 'musteri-islemleri/paket-ekle.html', permission: 'PackageModule' },
            { path: 'musteri-islemleri/randevu-girisi.html', permission: 'Booking' },
            { path: 'egitmen-islemleri/dersler.html', permission: 'StaffLessonList' },
            { path: 'personeller', permission: 'Staff' },
            { path: 'musteriler', permission: 'Customer' },
            { path: 'actual-hareketler/egitmen-listesi.html', permission: 'StaffPayment' },
            { path: 'genel-tanimlar/egitmen-mesaileri.html', permission: 'StaffWorkDay' },
            { path: 'finansal-tanimlar/kasa-tanimlari.html', permission: 'CashBox' },
            { path: 'finansal-tanimlar/kasa-hareketleri.html', permission: 'CashBoxTransaction' },
            { path: 'cari-hesaplar/hesap-hareketleri.html', permission: 'AccountTransaction' },
            { path: 'finansal-tanimlar/hakedis-hareketleri.html', permission: 'StaffPaymentTransaction' },
            { path: 'cari-hesaplar/tahsilat-formu.html', permission: 'CollectionTransaction' },
            { path: 'cari-hesaplar/vadeli-alacak-tahsilati.html', permission: 'CollectionTransaction' },
            { path: 'cari-hesaplar/musteri-taksit-listesi.html', permission: 'CollectionTransaction' },
            { path: 'cari-hesaplar/odeme-formu.html', permission: 'PaymentForm' },
            { path: 'cari-hesaplar/tedarikciler.html', permission: 'Supplier' },
            { path: 'urunler', permission: 'Product' },
            { path: 'urunler-islemleri', permission: 'ProductTransaction' },
        ];

        const routePermission = routePermissions.find((item) => path === item.path || path.indexOf(item.path + '/') === 0);
        return routePermission ? routePermission.permission : '';
    }
}
