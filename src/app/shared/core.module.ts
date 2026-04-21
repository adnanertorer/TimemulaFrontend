import { NgModule, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { appInitializer } from './services/app-initializer';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { LocationService } from './services/location.service';
import { StaffService } from './services/staff.service';
import { StaffTypeService } from './services/staff-type.service';
import { SalaryTypeService } from './services/salary-type.service';
import { BranchService } from './services/branch.service';
import { MissionService } from './services/mission.service';
import { ClassroomService } from './services/classroom.service';
import { SubServiceClassroomService } from './services/sub-service-classroom.service';
import { SubServiceTeacherService } from './services/sub-service-teacher.service';
import { CustomerService } from './services/customer.service';
import { BloodGroupService } from './services/blood-group.service';
import { SearchResourceService } from './services/search-resource.service';
import { ParentTypeService } from './services/parent-type.service';
import { PaymentTypeService } from './services/payment-type.service';
import { CustomerLessonService } from './services/customer-lesson.service';
import { ParticipationService } from './services/participation.service';
import { CustomerLessonsScheduleService } from './services/customer-lessons-schedule.service';
import { CategoryService } from './services/category.service';
import { SubCategoryService } from './services/sub-category.service';
import { ArtPackageService } from './services/art-package.service';
import { ParticipantTypeService } from './services/participant-type.service';
import { ParticipantService } from './services/participant.service';
import { PackageClassroomService } from './services/classroom-package.service';
import { LessonEducatorService } from './services/lesson-educator.service';
import { AccountingTransactionService } from './services/accounting-transaction.service';
import { ProductService } from './services/product.service';
import { SupplierService } from './services/supplier.service';
import { WarehouseService } from './services/warehouse.service';
import { DeptCollectionService } from './services/dept-collection.service';
import { CashboxService } from './services/cashbox.service';
import { PaymentService } from './services/payment.service';
import { CashBoxTransactionService } from './services/cash-box-transaction.service';
import { EducatorCostService } from './services/educator-cost.service';
import { CustomerLessonsTempService } from './services/customer-lessons-temp.service';
import { EducatorDaysHoursService } from './services/educator-days-hours.service';
import { CustomerInstallmentService } from './services/customer-installment.service';
import { DiseaseMainService } from './services/disease-main.service';
import { CustomerHealthService } from './services/customer-health.service';
import { MeetingRequestService } from './services/meeting-request.service';
import { CityService } from './services/city-service.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, LocationService, StaffService,
        StaffTypeService, SalaryTypeService, BranchService, MissionService,
      ClassroomService, SubServiceClassroomService, SubServiceTeacherService, CustomerService,
      BloodGroupService, SearchResourceService, ParentTypeService, PaymentTypeService,
      CustomerLessonService, ParticipationService, CustomerLessonsScheduleService, CategoryService, SubCategoryService, ArtPackageService,
      ParticipantTypeService, ParticipantService, PackageClassroomService, LessonEducatorService,
      AccountingTransactionService, ProductService, SupplierService, WarehouseService,
      DeptCollectionService, CashboxService, PaymentService, CashBoxTransactionService, EducatorCostService,
      CustomerLessonsTempService, EducatorDaysHoursService, CustomerInstallmentService,
       DiseaseMainService, CustomerHealthService, MeetingRequestService, CityService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core Module can only be imported to AppModule.');
    }
  }
}