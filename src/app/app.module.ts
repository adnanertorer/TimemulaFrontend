import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from './shared/core.module';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { ModalModule } from './_content/modal/modal.module';

import { AppRoutingModule } from './app.routing';
import { MyMaterialModule } from './material.module';
import { ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ConfirmationDialogService } from './shared/tools/confirmation-dialog/confirmation-dialog.service';
import { DefaultLayoutComponent } from './containers/default-layout';
import { CustomerService } from './shared/services/customer.service';
import {
  AgendaService, DayService, MonthAgendaService, MonthService, TimelineMonthService,
  TimelineViewsService, WeekService, WorkWeekService
} from '@syncfusion/ej2-angular-schedule';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollectionSubComponent } from './views/base/collection-sub/collection-sub.component';
import { PaymentSubComponent } from './views/base/payment-sub/payment-sub.component';
import { EducatorLessonCostModalComponent } from './views/base/educator-lesson-cost-modal/educator-lesson-cost-modal.component';
import { GeneralPaymentSubComponent } from './views/base/general-payment-sub/general-payment-sub.component';
import { CustomerLessonsTempService } from './shared/services/customer-lessons-temp.service';
import { InstallmentCollectionComponent } from './views/base/installment-collection/installment-collection.component';
import { RegisterWizardStepsComponent } from './views/register-wizard-steps/register-wizard-steps.component';
import { CompleteRegisterWizardComponent } from './views/register-wizard-steps/complete-register-wizard/complete-register-wizard.component';
import { RegisterFormPageComponent } from './views/register-wizard-steps/register-form-page/register-form-page.component';
import { StepTemplateComponent } from './views/register-wizard-steps/step-template/step-template.component';
import { CreateCategoryComponent } from './views/base/create-category/create-category.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { CreateSubCategoryComponent } from './views/base/create-sub-category/create-sub-category.component';
import { CreateLessonComponent } from './views/base/create-lesson/create-lesson.component';
import { CreateClassroomComponent } from './views/base/create-classroom/create-classroom.component';
import { PackageClassroomComponent } from "./views/base/package-classroom/package-classroom.component";
import { CreateEducatorComponent } from './views/base/create-educator/create-educator.component';
import { CreateLessonEducatorComponent } from './views/base/create-lesson-educator/create-lesson-educator.component';
import { CreateEducatorWorkingHoursComponent } from './views/base/create-educator-working-hours/create-educator-working-hours.component';
import { CreateLessonPackageComponent } from './views/base/create-lesson-package/create-lesson-package.component';
import { CreateCashboxComponent } from './views/base/create-cashbox/create-cashbox.component';
import { ErrorDialogComponent } from './views/error/Error-Dialog/Error-Dialog.component';
import { ErrorDialogService } from './views/error/Error-Dialog/error-dialog.service';
import { AccountTransactionsByCustomerComponent } from './views/base/account-transactions-by-customer/account-transactions-by-customer.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './views/update-password/update-password.component';
import { PaginatorModule } from "src/app/shared";
import { DatePickerComponent } from './shared/components/date-picker-component/date-picker-component';

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    CollectionSubComponent,
    PaymentSubComponent,
    EducatorLessonCostModalComponent,
    GeneralPaymentSubComponent,
    InstallmentCollectionComponent,
    RegisterWizardStepsComponent,
    CompleteRegisterWizardComponent,
    RegisterFormPageComponent,
    StepTemplateComponent,
    CreateCategoryComponent,
    CreateSubCategoryComponent,
    CreateLessonComponent,
    CreateClassroomComponent,
    CreateEducatorComponent,
    CreateLessonEducatorComponent,
    CreateEducatorWorkingHoursComponent,
    CreateLessonPackageComponent,
    CreateCashboxComponent,
    ErrorDialogComponent,
    AccountTransactionsByCustomerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent
    //ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    FlatpickrModule,
    HttpClientModule,
    ScheduleAllModule,
    RouterModule,
    CoreModule,
    AppRoutingModule,
    MyMaterialModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    ModalModule,
    JwPaginationModule,
    IconSetModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    PaginatorModule,
    DatePickerComponent
],
  providers: [
    IconSetService,
    FlatpickrDefaults,
    ConfirmationDialogService,
    CustomerService,
    CustomerLessonsTempService,
    DayService, WeekService, WorkWeekService, MonthService,
    AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService, ErrorDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
