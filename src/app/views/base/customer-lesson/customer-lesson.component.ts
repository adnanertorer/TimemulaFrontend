import { Component, ElementRef, Injectable, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/shared/model/branch';
import { CustomerLessonModel } from 'src/app/shared/model/customer-lesson-model';
import { LifeartsService } from 'src/app/shared/model/lifearts-service';
import { PaymentTypeModel } from 'src/app/shared/model/payment-type-model';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { SubService } from 'src/app/shared/model/sub-service';
import { VSubServiceClassroomModel } from 'src/app/shared/model/v-sub-service-classroom-model';
import { VSubserviceTeacher } from 'src/app/shared/model/v-subservice-teacher';
import { BranchService } from 'src/app/shared/services/branch.service';
import { CustomerLessonService } from 'src/app/shared/services/customer-lesson.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PaymentTypeService } from 'src/app/shared/services/payment-type.service';
import { StaffService } from 'src/app/shared/services/staff.service';
import { SubServiceClassroomService } from 'src/app/shared/services/sub-service-classroom.service';
import { SubServiceTeacherService } from 'src/app/shared/services/sub-service-teacher.service';
import { SubServiceService } from 'src/app/shared/services/sub-service.service';
import { createElement, L10n } from '@syncfusion/ej2-base';
import { ActionEventArgs, EventSettingsModel, PopupOpenEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
declare let alertify: any;
import { CustomerLessonSchedule } from 'src/app/shared/model/customer-lesson-schedule';
import { CustomerLessonsScheduleService } from 'src/app/shared/services/customer-lessons-schedule.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/model/customer';
import { LifeartsArtServiceService } from 'src/app/shared/services/lifearts-service.service';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-customer-lesson',
  templateUrl: './customer-lesson.component.html',
  styleUrls: ['./customer-lesson.component.css'],
})
export class CustomerLessonComponent implements OnInit {

  @ViewChild("scheduleObj")
  public scheduleObj: ScheduleComponent;
  

  lifeArtsServices: LifeartsService[] = [];
  subServices: SubService[] = [];
  staffs: StaffModel[] = [];
  educators: StaffModel[] = [];
  paymentTypes: PaymentTypeModel[] = [];
  branches: Branch[] = [];
  classrooms: VSubServiceClassroomModel[] = [];
  customerLesson: CustomerLessonModel;
  selectedCustomerId: number = 0;
  modalOpen: boolean = false;
  isRemainPayment: boolean = false;
  subServiceTeacherList: VSubserviceTeacher[] = []; 
  customerName: string = "";
  

  serviceInputSelect: HTMLInputElement;
  subServiceInput: HTMLInputElement;
  educatorSelect: HTMLInputElement;
  classroomSelect: HTMLInputElement;
  leadingPersonSelect: HTMLInputElement;
  paidInput: HTMLInputElement;
  priceInput: HTMLInputElement;
  remainPriceInput: HTMLInputElement;
  paymentCheckInput: HTMLInputElement;

  customerLessonDataSource:CustomerLessonSchedule[] = [];

  public eventSettings: EventSettingsModel = {
    dataSource: this.customerLessonDataSource
  }

  constructor(private lifeartServiceService: LifeartsArtServiceService, public subServiceService: SubServiceService,
    private staffService: StaffService, private paymentTypeService: PaymentTypeService, private branchService: BranchService,
    private modalService: ModalService, private activatedRoute: ActivatedRoute, private service: CustomerLessonService,
    private subServiceTeacherService: SubServiceTeacherService, private classroomService: SubServiceClassroomService,
    private renderer:Renderer2,
                  private el:ElementRef, private customerScheduleService: CustomerLessonsScheduleService,
                  private customerService: CustomerService) { }


    
  onBegin(args: any): void {
    if (args.requestType === 'eventCreate') {
      debugger;
      let schObj = (document.querySelector('.e-schedule') as any)
        .ej2_instances[0];
        console.log(schObj);
        console.log(JSON.stringify(args.data[0]));
        var model = args.data[0];
        

        this.customerLesson = {
          branch_id: 1,
          classroom_id: parseInt(this.classroomSelect.value.toString()),
          created_by: 0,
          customer_id: this.selectedCustomerId,
          educator_id: parseInt(this.educatorSelect.value.toString()),
          id: 0,
          leading_person_id: parseInt(this.leadingPersonSelect.value.toString()),
          price: 0,
          process_at: new Date(),
          process_detail: '',
          service_id: parseInt(this.serviceInputSelect.value.toString()),        
          staff_id: 0,
          sub_service_id: parseInt(this.subServiceInput.value.toString()),
          startDate: new Date()
        };

        /*this.service.add(this.customerLesson).subscribe((data)=>{
          if(data.success){
            //alertify.set('notifier', 'position', 'top-right');
            //alertify.success(data.clientMessage, 2);
             let result = data.dynamicClass as CustomerLessonModel;

             const customerSchedule: CustomerLessonSchedule = {
              Description: model.Description,
              EndTime: model.EndTime,
              IsAllDay: model.IsAllDay,
              Location: model.Location,
              RecurrenceRule: model.RecurrenceRule,
              StartTime: model.StartTime,
              Subject: model.Subject,
              customer_lesson_id: result.id,
              id: 0,
              EndTimezone: model.EndTimezone,
              StartTimezone: model.StartTimezone,
              educator_id: result.educator_id
            };

            this.customerScheduleService.add(customerSchedule).subscribe((data)=>{
              if(data.success){
                alertify.set('notifier', 'position', 'top-right');
                alertify.success(data.clientMessage, 2);
              }else{
                alertify.set('notifier', 'position', 'top-right');
                alertify.error(data.clientMessage, 2);
              }
            }, (err)=>{
              console.error(err);
            })
          }else{
            alertify.set('notifier', 'position', 'top-right');
            alertify.error(data.clientMessage, 2);
          }
        }, (err)=>{
          console.error(err);
        });*/

        console.log(this.customerLesson);

        

    } else if (args.requestType === 'eventChange') {
      let schObj = (document.querySelector('.e-schedule') as any)
        .ej2_instances[0];
        console.log(schObj);
        console.log(JSON.stringify(args.data[0]));
    }
  }

  ngOnInit() {
    this.customerLesson = {
      branch_id: 0,
      created_by: 0,
      customer_id: this.selectedCustomerId,
      educator_id: 0,
      id: 0,
      leading_person_id: 0,
      remaining_price: 0,
      paid: 0,
      payment_type_id: 0,
      price: 0,
      process_at: new Date(),
      process_detail: '',
      remaining_payment_at: null,
      service_id: 0,
      staff_id: 0,
      sub_service_id: 0,
      classroom_id: 0,
      lesson_group_id:0,
      startDate: new Date()
    };
    this.activatedRoute.params.subscribe(params => {
      this.selectedCustomerId = parseInt(params["id"]);
      this.customerLesson.customer_id = this.selectedCustomerId;
      this.customerService.getDetails(this.selectedCustomerId).subscribe((data)=>{
        if(data.success){
          const customerModel = data.dynamicClass as Customer;
          this.customerName = customerModel.name+" "+customerModel.surname;
        }
      })
    });
    
L10n.load({
  "en": {
      "schedule": {
          "day": "Gün",
          "week": "Hafta",
          "workWeek": "İş Günleri",
          "month": "Ay",
          "year": "Yıl",
          "agenda": "Ajanda",
          "weekAgenda": "Haftalık Ajanda",
          "workWeekAgenda": "İş Günleri Ajanda",
          "monthAgenda": "Aylık Ajanda",
          "today": "Bugün",
          "noEvents": "Etkinlik Yok",
          "emptyContainer": "Takvimde bugün herhangi bir etkinlik yok.",
          "allDay": "Tüm gün",
          "start": "Başlama",
          "end": "Bitiş",
          "more": "daha fazla..",
          "close": "Kapat",
          "cancel": Constants.Cancel,
          "noTitle": "(No Title)",
          "delete": "Sil",
          "deleteEvent": "Seçili Ders",
          "deleteMultipleEvent": "Birden fazla etkinlik silmek",
          "selectedItems": "Seçili Ders",
          "deleteSeries": "Bütün Paket",
          "edit": "Edit",
          "editSeries": "Bütün Paket",
          "editEvent": "Seçili Ders",
          "createEvent": "Oluştur",
          "subject": "Subject",
          "addTitle": "Başlık ekle",
          "moreDetails": "Daha fazla ayar",
          "save": Constants.Save,
          "editContent": "Serideki randevuyu nasıl değiştirmek istersiniz?",
          "deleteContent": "Bu etkinliği silmek istediğinizden emin misiniz?",
          "deleteMultipleContent": "Seçili etkinlikleri silmek istediğinizden emin misiniz?",
          "newEvent": "Yeni Etkinlik",
          "title": "Başlık",
          "location": "Konum",
          "description": "Açıklama",
          "timezone": "Timezone",
          "startTimezone": "Başla Timezone",
          "endTimezone": "Bitiş Timezone",
          "repeat": "Tekrarlı",
          "saveButton": Constants.Save,
          "cancelButton": Constants.Cancel,
          "deleteButton": "Sil",
          "recurrence": "Yineleme",
          "wrongPattern": "Yineleme modeli geçerli değil.",
          "seriesChangeAlert": "Bu serinin belirli örneklerinde yapılan değişiklikleri iptal edip tekrar tüm seriyle eşleştirmek istiyor musunuz?",
          "createError": "Olayın süresi, meydana gelme sıklığından daha kısa olmalıdır. Süreyi kısaltın veya yineleme olayı düzenleyicisinde yineleme düzenini değiştirin.",
          "sameDayAlert": "Aynı olayın iki tekrarı aynı günde gerçekleşemez..",
          "editRecurrence": "Yinelenmeyi Düzenle",
          "repeats": "Tekrarlar",
          "alert": "Uyarı",
          "startEndError": "Seçilen bitiş tarihi, başlangıç ​​tarihinden önce geliyor.",
          "invalidDateError": "Girilen tarih değeri geçersiz.",
          "blockAlert": "Etkinlikler, engellenen zaman aralığında planlanamaz.",
          "ok": "Tamam",
          "yes": "Evet",
          "no": "Hayır",
          "occurrence": "Oluşum",
          "series": "Seri",
          "previous": "Önceki",
          "next": "Sonraki",
          "timelineDay": "Günklük Çizelge",
          "timelineWeek": "Haftalık Çizelge",
          "timelineWorkWeek": "Timeline Work Week",
          "timelineMonth": "Aylık Çizelge",
          "timelineYear": "YIllık Çizelge",
          "editFollowingEvent": "Takip eden etkinlikler",
          "deleteTitle": "Etkinlik Sil",
          "editTitle": "Etkinlik Düzenle",
          "beginFrom": "Buradan başlayın",
          "endAt": "Bitiş",
          "expandAllDaySection": "Bütün gün bölümünü genişlet",
          "collapseAllDaySection": "Bütün gün bölümünü daralt"
      },
      "recurrenceeditor": {
          "none": "None",
          "daily": "Günlük",
          "weekly": "Haftalık",
          "monthly": "Aylık",
          "month": "Ay",
          "yearly": "Yıllık",
          "never": "Asla",
          "until": "Şu zamana kadar",
          "count": "Kaç Adet?",
          "first": "İlk",
          "second": "İkinci",
          "third": "Üçüncü",
          "fourth": "Dördüncü",
          "last": "Son",
          "repeat": "Tekrarla",
          "repeatEvery": "Tekrar Sayısı",
          "on": "Tekrarlama Açık",
          "end": "Bitiş",
          "onDay": "Gün",
          "days": "Gün(s)",
          "weeks": "Hafta(s)",
          "months": "Ay(s)",
          "years": "Yıl(s)",
          "every": "her",
          "summaryTimes": "time(s)",
          "summaryOn": "on",
          "summaryUntil": "until",
          "summaryRepeat": "Tekrar Sayısı",
          "summaryDay": "gün(s)",
          "summaryWeek": "hafta(s)",
          "summaryMonth": "ay(s)",
          "summaryYear": "yıl(s)",
          "monthWeek": "Ayın Haftası",
          "monthPosition": "Month Position",
          "monthExpander": "Ay Genişlet",
          "yearExpander": "Yıl Genişlet",
          "repeatInterval": "Repeat Interval"
      }
  }
  });
  
  }

  ngAfterViewInit(){
    document.getElementById('service_id').onchange = (val) => {
      console.log(val);
    } 
  }

 
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      if (!args.element.querySelector('.custom-field-row')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let formElement: HTMLElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
        let container: HTMLElement = createElement('div', { className: 'custom-field-container' });

        /*document.querySelector('.e-subject-container').setAttribute("style", "display:none;");
        document.querySelector('.e-location-container').setAttribute("style", "display:none;");
        document.querySelector('.e-time-zone-container').setAttribute("style", "display:none;");*/

        let lblService: HTMLInputElement = createElement('label',{
          
        }) as HTMLInputElement;

        this.renderer.appendChild(lblService, document.createTextNode('Hizmet Seçiniz')); // hizmet label

        this.serviceInputSelect = createElement('select', {
            className: 'form-control', attrs: { name: 'service_id', id: 'service_id', placeholder: 'Hizmet Seçiniz' }
        }) as HTMLInputElement; // hizmet select input

        let lblSubService: HTMLInputElement = createElement('label',{
          styles:'margin-top: 10px;'
        }) as HTMLInputElement; 

        this.renderer.appendChild(lblSubService, document.createTextNode('Alt Hizmet Seçiniz')); // alt hizmet label
       
        this.subServiceInput = createElement('select',{
          className:'form-control', attrs: {
            name: 'sub_service_id',
            id: 'sub_service_id'
          }
        }) as HTMLInputElement;  // alt hizmet select input

        let lblClass: HTMLInputElement = createElement('label',{
          styles:'margin-top: 10px;',
        }) as HTMLInputElement; 

        this.renderer.appendChild(lblClass, document.createTextNode('Derslik')); // alt hizmet label
       
        this.classroomSelect = createElement('select', {
          className: 'form-control', attrs: { name: 'classroom_id', id: 'classroom_id', placeholder: 'Sınıf Seçiniz' }
        }) as HTMLInputElement; // sınıf select input


        this.renderer.appendChild(this.el.nativeElement, this.classroomSelect); // sınıf select inptu

        this.renderer.listen(this.classroomSelect, 'change', () =>{
          console.log(this.classroomSelect.value);
        });

        let lblEducator: HTMLInputElement = createElement('label',{
          styles:'margin-top: 10px;'
        }) as HTMLInputElement; 

        this.renderer.appendChild(lblEducator, document.createTextNode('Eğitmen')); // egitmen label

        this.educatorSelect = createElement('select', {
          className: 'form-control', attrs: { name: 'educator_id', id: 'educator_id', placeholder: 'Eğitmen Seçiniz' }
        }) as HTMLInputElement; // egitmen select input

        let lblLeadingPerson: HTMLInputElement = createElement('label',{
          styles:'margin-top: 10px;'
        }) as HTMLInputElement; 

        this.renderer.appendChild(lblLeadingPerson, document.createTextNode('Yönlendiren')); // yonlendiren label

        this.leadingPersonSelect = createElement('select', {
          className: 'form-control', attrs: { name: 'leading_person_id', id: 'leading_person_id', placeholder: 'Yönlendiren Seçiniz' }
        }) as HTMLInputElement; // yonlendiren select input

        let lblPrice: HTMLInputElement = createElement('label',{
          styles:'margin-top: 10px;',
        }) as HTMLInputElement; 

        this.renderer.appendChild(lblPrice, document.createTextNode('Ücret')); // ucret label
       
        this.priceInput = createElement('input', {
          className: 'form-control', attrs: { name: 'price', id: 'price', type:'number' }
        }) as HTMLInputElement; // price input

        this.priceInput.disabled = true;
        
        let checkDiv: HTMLInputElement = createElement('div', {
          className:'e-checkbox-wrapper e-wrapper',
        }) as HTMLInputElement;


        checkDiv.setAttribute('aria-checked', 'false');
        checkDiv.setAttribute('style','margin-top: 10px;');

        let checkMainLabel: HTMLInputElement = createElement('label', {
        }) as HTMLInputElement;

        checkMainLabel.setAttribute('for', 'do_payment');

        this.renderer.appendChild(checkDiv, checkMainLabel);

        this.paymentCheckInput = createElement('input', { className:'e-field e-control almula-checkbox e-lib',
          attrs: { name: 'do_payment', id: 'do_payment', type:'checkbox' }
        }) as HTMLInputElement; // checkpayment input
      

        this.renderer.appendChild(checkMainLabel, this.paymentCheckInput);

        let checkSpan: HTMLInputElement = createElement('span', {
          className:'e-icons e-frame'
        }) as HTMLInputElement;

        this.renderer.appendChild(checkMainLabel, checkSpan);

        this.renderer.listen(this.paymentCheckInput, 'change', ()=>{
          console.log('tamam');
          if(!checkSpan.classList.contains('e-check')){
            checkSpan.classList.add('e-check');
            checkDiv.removeAttribute('aria-checked');
            checkDiv.setAttribute('aria-checked', 'true');
          }else{
            checkSpan.classList.remove('e-check');
            checkDiv.removeAttribute('aria-checked');
            checkDiv.setAttribute('aria-checked', 'false');
          }
          
        });

        

        let checkSpanELabel: HTMLInputElement = createElement('span', {
          className:'e-label'
        }) as HTMLInputElement;

        this.renderer.appendChild(checkSpanELabel, document.createTextNode('Ödeme'));

        this.renderer.appendChild(checkMainLabel, checkSpanELabel);

        container.appendChild(lblService);
        container.appendChild(this.serviceInputSelect);
        container.appendChild(lblSubService);
        container.appendChild(this.subServiceInput);
        container.appendChild(lblClass);
        container.appendChild(this.classroomSelect);
        container.appendChild(lblEducator);
        container.appendChild(this.educatorSelect);
        container.appendChild(lblLeadingPerson);
        container.appendChild(this.leadingPersonSelect);
        container.appendChild(lblPrice);
        container.appendChild(this.priceInput);
        container.appendChild(checkDiv);
        row.appendChild(container);

        this.lifeartServiceService.getList().subscribe((data)=>{
          if(data.success){
            this.lifeArtsServices = data.dynamicClass as LifeartsService[];
            const option = this.renderer.createElement('option');
            option.setAttribute('value', '0');
            this.renderer.appendChild(option, document.createTextNode('Seçiniz'));
            this.renderer.appendChild(this.serviceInputSelect, option);
            for (let index = 0; index < this.lifeArtsServices.length; index++) {
              const option = this.renderer.createElement('option');
              option.setAttribute('value', this.lifeArtsServices[index].id);
              this.renderer.appendChild(option, document.createTextNode(this.lifeArtsServices[index].serviceName));
              this.renderer.appendChild(this.serviceInputSelect, option);
            }
          }
        });

        this.renderer.listen(this.serviceInputSelect, 'change', () =>{
          this.getSubService(parseInt(this.serviceInputSelect.value.toString()));
        });

        this.renderer.listen(this.subServiceInput, 'change', ()=>{
          this.subServiceService.getDetails(parseInt(this.subServiceInput.value.toString())).subscribe((data)=>{
            if(data.success){
              const subService = data.dynamicClass as SubService;
              this.customerLesson.price = subService.price;
              this.priceInput.value = subService.price.toString();
            }
          })
          this.getClassrooms(parseInt(this.subServiceInput.value.toString()));
        });

        this.renderer.listen(this.classroomSelect, 'change', ()=>{
          this.getEducators(parseInt(this.classroomSelect.value.toString()));
        });

        this.getStaffs();

      }
    }
  }

  prepareModal(){
    this.getBranches();
    //this.getEducators();
    this.getLifeArtService();
    this.getPaymentTypes();
    this.getStaffs();
  }

  openModal(){
    this.prepareModal();
    this.modalOpen =  true;
  }

  closeModal(){
    this.modalOpen = false;
  }

  onChangeService($event, serviceId) {
    serviceId = parseInt(serviceId);
    this.getSubService(serviceId);
  }

  onPaidChange(searchValue: string): void { 
    if(this.customerLesson.price !== 0){
      try{
        const paid = parseFloat(searchValue.trim());
        const result = this.customerLesson.price - paid;
        if(result>=0){
          this.isRemainPayment = true;
          this.customerLesson.remaining_price = result;
        }else{
          this.isRemainPayment = false;
          this.customerLesson.remaining_price = 0;
        }
      }catch(err){
        console.error(err);
      }
    }
  }

  onChangeSubService($event, subServiceId){
    //this.getEducators(parseInt(subServiceId));
    this.getClassrooms(parseInt(subServiceId));
    this.subServiceService.getDetails(parseInt(subServiceId)).subscribe((data)=>{
      if(data.success){
        const subService = data.dynamicClass as SubService;
        this.customerLesson.price = subService.price;
      }
    })
  }

  getLifeArtService(){
    this.lifeartServiceService.getList().subscribe((data)=>{
      if(data.success){
        this.lifeArtsServices = data.dynamicClass as LifeartsService[];
      }
    });
  }

  getSubService(id: number){
    const all = this.subServiceInput.getElementsByTagName('option');
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      this.renderer.removeChild(this.subServiceInput, element);
    }
    this.subServiceService.getList(id).subscribe((data)=>{
      if(data.dynamicClass){
        this.subServices = data.dynamicClass as SubService[];
        const option = this.renderer.createElement('option');
        option.setAttribute('value', '0');
        this.renderer.appendChild(option, document.createTextNode('Seçiniz'));
        this.renderer.appendChild(this.subServiceInput, option);

        for (let index = 0;index < this.subServices.length; index++) {
          const option = this.renderer.createElement('option');
          option.setAttribute('value', this.subServices[index].id.toString());
          let groupOrSingle = this.subServices[index].isGroup ? 'Grub Dersi' : 'Bireysel';
          this.renderer.appendChild(option, document.createTextNode(this.subServices[index].subServiceName+' '+groupOrSingle));
          this.renderer.appendChild(this.subServiceInput, option);
        }
      }
    })
  }

  getStaffs(){

    const all = this.leadingPersonSelect.getElementsByTagName('option');
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      this.renderer.removeChild(this.leadingPersonSelect, element);
    }

    this.staffService.getList().subscribe((data)=>{
      if(data.success){
        this.staffs = data.dynamicClass as StaffModel[];

        const option = this.renderer.createElement('option');
        option.setAttribute('value', '0');
        this.renderer.appendChild(option, document.createTextNode('Seçiniz'));
        this.renderer.appendChild(this.leadingPersonSelect, option);

        for (let index = 0; index < this.staffs.length; index++) {
          const option = this.renderer.createElement('option');
          option.setAttribute('value', this.staffs[index].id.toString());
          this.renderer.appendChild(option, document.createTextNode(this.staffs[index].name+' '+this.staffs[index].surname));
          this.renderer.appendChild(this.leadingPersonSelect, option);
        }
      }
    })
  }

  getPaymentTypes(){
    this.paymentTypeService.getList().subscribe((data)=>{
      if(data.success){
        this.paymentTypes = data.dynamicClass as PaymentTypeModel[];
      }
    })
  }

  getEducators(id: number){
    const all = this.educatorSelect.getElementsByTagName('option');
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      this.renderer.removeChild(this.educatorSelect, element);
    }
    this.subServiceTeacherService.getList(id).subscribe((data)=>{
      if(data.success){
        this.subServiceTeacherList = data.dynamicClass as VSubserviceTeacher[];

        const option = this.renderer.createElement('option');
        option.setAttribute('value', '0');
        this.renderer.appendChild(option, document.createTextNode('Seçiniz'));
        this.renderer.appendChild(this.educatorSelect, option);

        for (let index = 0; index < this.subServiceTeacherList.length; index++) {
          try {
            const option = this.renderer.createElement('option');
            option.setAttribute('value', this.subServiceTeacherList[index].id);
            this.renderer.appendChild(option, document.createTextNode(this.subServiceTeacherList[index].name+' '+this.subServiceTeacherList[index].surname));
            this.renderer.appendChild(this.educatorSelect, option);
          } catch (error) {
            console.error(error);
          }
         
        }
      }
    })
  }


  getClassrooms(id: number){
    const all = this.classroomSelect.getElementsByTagName('option');
    for (let index = 0; index < all.length; index++) {
      const element = all[index];
      this.renderer.removeChild(this.classroomSelect, element);
    }
    
    this.classroomService.getList(id).subscribe((data)=>{
      if(data.success){
        this.classrooms = data.dynamicClass as VSubServiceClassroomModel[];
        const option = this.renderer.createElement('option');
        option.setAttribute('value', '0');
        this.renderer.appendChild(option, document.createTextNode('Seçiniz'));
        this.renderer.appendChild(this.classroomSelect, option);

        for (let index = 0; index < this.classrooms.length; index++) {
          const option = this.renderer.createElement('option');
          option.setAttribute('value', this.classrooms[index].classroom_id);
          this.renderer.appendChild(option, document.createTextNode(this.classrooms[index].classroom_name));
          this.renderer.appendChild(this.classroomSelect, option);
        }
      }
    })
  }

  getBranches(){
    this.branchService.getList().subscribe((data)=>{
      if(data.success){
        this.branches = data.dynamicClass as Branch[];
      }
    })
  }

  add(): void {
    this.customerLesson.branch_id = parseInt(this.customerLesson.branch_id.toString());
    this.customerLesson.educator_id = parseInt(this.customerLesson.educator_id.toString());
    this.customerLesson.leading_person_id = parseInt(this.customerLesson.leading_person_id.toString());
    this.customerLesson.remaining_price = parseFloat(this.customerLesson.remaining_price.toString());
    this.customerLesson.paid = parseFloat(this.customerLesson.paid.toString());
    this.customerLesson.payment_type_id = parseInt(this.customerLesson.payment_type_id.toString());
    this.customerLesson.price = parseFloat(this.customerLesson.price.toString());
    this.customerLesson.service_id = parseInt(this.customerLesson.service_id.toString());
    this.customerLesson.staff_id = this.customerLesson.educator_id;
    this.customerLesson.sub_service_id = parseInt(this.customerLesson.sub_service_id.toString());
    this.customerLesson.classroom_id = parseInt(this.customerLesson.classroom_id.toString());
    /*if (this.customerLesson.id == 0) {
      this.service.add(this.customerLesson).subscribe((data) => {
        if (data.success) {
          //listeyi getir
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.customerLesson).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          //listeyi getir
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }*/
  }

}

