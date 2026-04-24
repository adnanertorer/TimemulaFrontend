import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { RegisterFormPageComponent } from './views/register-wizard-steps/register-form-page/register-form-page.component';
import { CompleteRegisterWizardComponent } from './views/register-wizard-steps/complete-register-wizard/complete-register-wizard.component';
import { AccountTransactionsByCustomerComponent } from './views/base/account-transactions-by-customer/account-transactions-by-customer.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './views/update-password/update-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'form',
    component: RegisterFormPageComponent,
  },
  {
    path: 'complete',
    component: CompleteRegisterWizardComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Panel'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'update-password',
        component: UpdatePasswordComponent,
        data: {
          title: 'Update Password Page'
        }
      },
      {
        path: 'personeller',
        loadChildren: () => import('./views/staffs/staffs.module').then(m => m.StaffsModule)
      },
      {
        path: 'gun-sonu-raporu',
        loadChildren: () => import('./views/base/ends-of-day/ends-of-day.module').then(m => m.EndsOfDayModule)
      },
      {
        path: 'gun-sonu-raporu/detay/:id',
        loadChildren: () => import('./views/base/ends-of-day/end-of-day-detail/end-of-day-detail.module').then(m => m.EndOfDayDetailModule)
      },
      {
        path: 'urunler',
        loadChildren: () => import('./views/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'urunler-islemleri',
        loadChildren: () => import('./views/product/product-stock/product-stock.module').then(m => m.ProductStockModule)
      },
       {
        path: 'musteriler',
        loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'genel-rapor.html',
        loadChildren: () => import('./views/base/main-report/main-report.module').then(m => m.MainReportModule)
      },
      {
        path: 'musteriler/detay/:id',
        loadChildren: () => import('./views/customer-detail/customer-detail.module').then(m => m.CustomerDetailModule)
      },
      {
        path: 'genel-tanimlar/kategoriler.html',
        loadChildren: () => import('./views/base/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'genel-tanimlar/alt-kategoriler.html',
        loadChildren: () => import('./views/base/sub-category/sub-category.module').then(m => m.SubCategoryModule)
      },
      {
        path: 'genel-tanimlar/paketler.html',
        loadChildren: () => import('./views/base/art-package/art-package.module').then(m => m.ArtPackageModule)
      },
      {
        path: 'genel-tanimlar/personel-tipleri.html',
        loadChildren: () => import('./views/base/staff-types/staff-types.module').then(m => m.StaffTypesModule)
      },
      {
        path: 'genel-tanimlar/egitmen-mesaileri.html',
        loadChildren: () => import('./views/base/educator-days-hours/educator-days-hours.module').then(m => m.EducatorDaysHoursModule)
      },
      {
        path: 'genel-tanimlar/arama-motorlari.html',
        loadChildren: () => import('./views/base/search-resources/search-resources.module').then(m => m.SearchResourcesModule)
      },
      {
        path: 'genel-tanimlar/katilimci-tanimlari.html',
        loadChildren: () => import('./views/base/participant-type/participant-type.module').then(m => m.ParticipantTypeModule)
      },
      {
        path: 'genel-tanimlar/katilim-turleri.html',
        loadChildren: () => import('./views/base/participant/participant.module').then(m => m.ParticipantModule)
      },
      {
        path: 'genel-tanimlar/personel-gorev-tanimlari.html',
        loadChildren: () => import('./views/base/mission/mission.module').then(m => m.MissionModule)
      },
      {
        path: 'genel-tanimlar/maas-tipleri.html',
        loadChildren: () => import('./views/base/salary-types/salary-types.module').then(m => m.SalaryTypesModule)
      },
      {
        path: 'genel-tanimlar/bayi-tanimlari.html',
        loadChildren: () => import('./views/base/branch/branch.module').then(m => m.BranchModule)
      },
      {
        path: 'genel-tanimlar/hizmetler.html',
        loadChildren: () => import('./views/base/lifearts-service/lifearts-service.module').then(m => m.LifeartsServiceModule)
      },
      {
        path: 'genel-tanimlar/dersler.html',
        loadChildren: () => import('./views/base/lesson/lesson.module').then(m => m.LessonModule)
      },
      {
        path: 'genel-tanimlar/alt-hizmetler.html/:id',
        loadChildren: () => import('./views/base/sub-service/sub-service.module').then(m => m.SubServiceModule)
      },
      {
        path: 'genel-tanimlar/derslikler.html',
        loadChildren: () => import('./views/base/classroom/classroom.module').then(m => m.ClassroomModule)
      },
      {
        path: 'genel-tanimlar/ders-sinif-iliskisi.html',
        loadChildren: () => import('./views/base/package-classroom/package-classroom.module').then(m => m.PackageClassroomModule)
      },
      {
        path: 'genel-tanimlar/hizmet-calisan-iliskisi.html',
        loadChildren: () => import('./views/base/lesson-educator/lesson-educator.module').then(m => m.LessonEducatorModule)
      },
      {
        path: 'genel-tanimlar/ebeveynler.html',
        loadChildren: () => import('./views/base/parent-type/parent-type.module').then(m => m.ParentTypeModule)
      },
      {
        path: 'genel-tanimlar/yoklama-sonuc-tanimlari.html',
        loadChildren: () => import('./views/base/participation/participation.module').then(m => m.ParticipationModule)
      },
      {
        path: 'genel-tanimlar/genel-saglik-sorunlari.html',
        loadChildren: () => import('./views/base/disease-main/disease-main.module').then(m => m.DiseaseMainModule)
      },
      {
        path: 'genel-tanimlar/genel-saglik-sorunlari-alt-basliklar.html/:id',
        loadChildren: () => import('./views/base/disease-sub/disease-sub.module').then(m => m.DiseaseSubModule)
      },
      {
        path: 'genel-tanimlar/musteri-saglik-bilgileri.html/:id',
        loadChildren: () => import('./views/base/customer-health/customer-health.module').then(m => m.CustomerHealthModule)
      },
      {
        path: 'finansal-tanimlar/odeme-turleri.html',
        loadChildren: () => import('./views/base/payment-type/payment-type.module').then(m => m.PaymentTypeModule)
      },
      {
        path: 'cari-hesaplar/hesap-hareketleri.html',
        loadChildren: () => import('./views/base/account-transactions/account-transactions.module')
        .then(m => m.AccountTransactionsModule)
      },
      {
        path: 'cari-hesaplar/tedarikciler.html',
        loadChildren: () => import('./views/base/supplier/supplier.module').then(m => m.SupplierModule)
      },
      {
        path: 'cari-hesaplar/tahsilat-formu.html',
        loadChildren: () => import('./views/base/dept-collection/dept-collection.module').then(m => m.DeptCollectionModule)
      },
      {
        path: 'cari-hesaplar/vadeli-alacak-tahsilati.html',
        loadChildren: () => import('./views/base/customer-installment-list/customer-installment-list.module').then(m => m.CustomerInstallmentListModule)
      },
      {
        path: 'cari-hesaplar/musteri-taksit-listesi.html/:id',
        loadChildren: () => import('./views/base/customer-installment-detail-list/customer-installment-detail-list.module').then(m => m.CustomerInstallmentDetailListModule)
      },
      {
        path: 'cari-hesaplar/odeme-formu.html',
        loadChildren: () => import('./views/base/payment/payment.module').then(m => m.PaymentModule)
      },
      {
        path: 'finansal-tanimlar/kasa-tanimlari.html',
        loadChildren: () => import('./views/base/cashbox/cashbox.module').then(m => m.CashboxModule)
      },
      {
        path: 'finansal-tanimlar/kasa-hareketleri.html',
        loadChildren: () => import('./views/base/cashbox-transaction/cashbox-transaction.module').then(m => m.CashboxTransactionModule)
      },
      {
        path: 'finansal-tanimlar/hakedis-hareketleri.html',
        loadChildren: () => import('./views/base/educator-price-list/educator-price-list.module').then(m => m.EducatorPriceListModule)
      },
      {
        path: 'musteri-islemleri/paket-ekle.html',
        loadChildren: () => import('./views/base/customer-package/customer-package.module').then(m => m.CustomerPackageModule)
      },
      {
        path: 'musteri-islemleri/randevu-girisi.html',
        loadChildren: () => import('./views/base/meeting-request/meeting-request.module').then(m => m.MeetingRequestModule)
      },
      {
        path: 'musteri-hizmetleri/paketler.html/:id',
        loadChildren: () => import('./views/base/customer-lesson-detail/customer-lesson-detail.module').then(m => m.CustomerLessonDetailModule)
      },
      {
        path: 'musteri-hizmetleri/ders-kaydir.html/:id',
        loadChildren: () => import('./views/base/actual-customer-package/actual-customer-package.module').then(m => m.ActualCustomerPackageModule)
      },
      {
        path: 'musteri-hizmetleri/paketler-detay.html/:customerId/:unicKey',
        loadChildren: () => import('./views/base/customer-main-package-list/customer-main-package-list.module').then(m => m.CustomerMainPackageListModule)
      },
      {
        path: 'musteri-hizmetleri/paketler-degisiklik.html/:uniqKey/:customerId',
        loadChildren: () => import('./views/base/change-program/change-program.module').then(m => m.ChangeProgramModule)
      },
      {
        path: 'musteri/hizmetler.html/:id',
        loadChildren: () => import('./views/base/customer-lesson/customer-lesson.module').then(m => m.CustomerLessonModule)
      },
      {
        path: 'egitmen-islemleri/dersler.html',
        loadChildren: () => import('./views/base/educator-lesson-list/educator-lesson-list.module').then(m => m.EducatorLessonListModule)
      },
      {
        path: 'egitmen-islemleri/paket-seanslari.html/:id',
        loadChildren: () => import('./views/base/educator-package-lesson-list/educator-package-lesson-list.module').then(m => m.EducatorPackageLessonListModule)
      },
      {
        path: 'egitmen-islemleri/ogrenciler.html',
        loadChildren: () => import('./views/base/educator-package-student-list/educator-package-student-list.module').then(m => m.EducatorPackageStudentListModule)
      },
      {
        path: 'egitmen-islemleri/ogrenciler-takvimi.html',
        loadChildren: () => import('./views/base/customer-lesson-schedule/customer-lesson-schedule.module').then(m => m.CustomerLessonScheduleModule)
      },
      {
        path: 'actual-hareketler/ogrenci-listesi.html',
        loadChildren: () => import('./views/base/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'actual-hareketler/egitmen-listesi.html',
        loadChildren: () => import('./views/base/educators/educators.module').then(m => m.EducatorsModule)
      },
      {
        path: 'actual-hareketler/egitmen-paketleri.html/:id',
        loadChildren: () => import('./views/base/actual-educator-lessons/actual-educator-lessons.module').then(m => m.ActualEducatorLessonsModule)
      },
      {
        path: 'actual-hareketler/egitmen-hakedis-girisi.html/:id',
        loadChildren: () => import('./views/base/educator-prepare-price/educator-prepare-price.module').then(m => m.EducatorPreparePriceModule)
      },
      {
        path: 'actual-hareketler/egitmen-ogrencileri.html',
        loadChildren: () => import('./views/base/actual-educator-student-list/actual-educator-student-list.module').then(m => m.ActualEducatorStudentListModule)
      },
      {
        path: 'actual-hareketler/ogrenci-paketleri.html/:id', 
        loadChildren: () => import('./views/base/students-actual-packages/students-actual-packages.module').then(m => m.StudentsActualPackagesModule)
      },
      {
        path: 'actual-hareketler/ogrenci-paket-icerigi.html/:customerId/:unicKey',
        loadChildren: () => import('./views/base/student-actual-lessons/student-actual-lessons.module').then(m => m.StudentActualLessonsModule)
      },
      {
        path: 'actual-hareketler/ogrenci-paket-takvimi.html/:customerId/:unicKey',
        loadChildren: () => import('./views/base/student-lesson-schedule/student-lesson-schedule.module').then(m => m.StudentLessonScheduleModule)
      },
      /*{
        path: 'finansal-islemler/odeme-planlama.html/:id/:relationId',
        loadChildren: () => import('./views/base/customer-installment/customer-installment.module').then(m => m.CustomerInstallmentModule)
      },*/
      {
        path: 'finansal-islemler/odeme-planlama.html/:id',
        loadChildren: () => import('./views/base/customer-payment-plan/customer-payment-plan.module').then(m => m.CustomerPaymentPlanModule)
      },
      {
        path: 'finansal-islemler/musteri-cari-hareketleri.html/:id',
        component: AccountTransactionsByCustomerComponent
      },
      {
        path: 'kullanicilar',
        loadChildren: () => import('./views/base/company-users/company-user.module').then(m => m.CompanyUserModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
