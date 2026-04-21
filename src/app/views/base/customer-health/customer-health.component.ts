import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/model/customer';
import { CustomerHealthModel } from 'src/app/shared/model/customer-health-model';
import { DiseaseMainModel } from 'src/app/shared/model/disease-main-model';
import { DiseaseSubModel } from 'src/app/shared/model/disease-sub-model';
import { CustomerHealthService } from 'src/app/shared/services/customer-health.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { DiseaseMainService } from 'src/app/shared/services/disease-main.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-customer-health',
  templateUrl: './customer-health.component.html',
  styleUrls: ['./customer-health.component.css']
})
export class CustomerHealthComponent implements OnInit {

  model: CustomerHealthModel;
  list: CustomerHealthModel[] = [];
  selectedCustomerId:number = 0;
  diseaseMainList: DiseaseMainModel[] = [];
  diseaseSubList: DiseaseSubModel[] = [];
  customerName:string = '';
  isRequeiredDescription: boolean = false;
  customer:Customer;

  buttonText: string = Constants.Save;

  displayColums: string[] = ['diseaseCategoryName', 'diaseName', 'description', 'id'];
  dataSource: MatTableDataSource<CustomerHealthModel>;

  @ViewChild('paginatorHealth') paginator: MatPaginator;
  @ViewChild('healthSort') sort: MatSort;

  constructor(private service: CustomerHealthService, 
    private diseaseMainService: DiseaseMainService, private activatedRoute: ActivatedRoute,
    private customerService: CustomerService) {
      (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

  ngOnInit() {
    this.buttonText = 'Kaydet';
    this.customer = {
      address: '',
      birthDate: new Date(), //
      birthPlace: '', //
      disease: '',
      email: '', //
      emailRequest: true,//
      facebookAddress: '',//
      facebookParentAddress: '',//
      gender: 0, //
      gsm: '', //
      id: 0, //
      instagramAddress: '',//
      instagramParentAddress: '', //
      isActive: true,//
      isChild: false,//
      linkedinAddress: '',//
      linkedinParentAddress: '',
      name: '', //
      parentEmail: '', //
      parentIdentity: '',//
      parentName: '', //
      parentProf: '', //
      parentSurname: '', //
      phone: '', //
      smsRequest: false,//
      surname: ''//
    };
    this.model = {
      createdAt: new Date(),
      customerId: 0,
      description: '',
      id: 0,
      createdBy: 0,
      mainDiseaseId: 0,
      subDiseaseId: 0
    }
    this.activatedRoute.params.subscribe(params=>{
      this.selectedCustomerId = parseInt(params["id"]);
      this.model.customerId = this.selectedCustomerId;
      this.getCustomerDetail();
      this.getList();
      this.getDiseaseMainList();
    })
    
  }

  async generatePdf(action = 'open') {
    const documentDefinition = await this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  async getDocumentDefinition() {
    console.log(this.customer);
    console.log(this.list);
    return{
      content:[{
        text: this.customer.name+' '+this.customer.surname,
        bold: true,
        fontSize: 20,
        alignment:'center', 
        margin: [0,0,0,20]
      },
      {
        columns:[
          [
            {
              text: 'Adres: '+this.customer.address,
              style:'title'
            },
            {
              text:'E-Posta: '+this.customer.email,
              style:'title'
            },
            {
              text:'Gsm: '+this.customer.phone,
              style:'title'
            },
          ],
        ]
      },
      {
        text: 'Sağlık Bilgileri',
        style:'header'
      },
      this.getHealthInfo(),
    ],
    info: {
      title: this.customer.name +' '+this.customer.name+' SAĞLIK BİLGİLERİ',
      author: this.customer.name +' '+this.customer.name,
      subject: 'Özgeçmiş',
      keywords: 'Life Arts',
    },
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 12,
          bold: true,
          marginBottom:10
        },
        title: {
          fontSize: 10,
          marginBottom:5
        }
      }
    };
  }

  getHealthInfo(){
    return {
      table: {
        widths: ['auto', 'auto', 'auto'],
        body: [
          [{
            text: 'Rahatsızlık Başlığı',
            style: 'header'
          },
          {
            text: 'Rahatsızlık',
            style: 'header'
          },
          {
            text: 'Açıklama',
            style: 'header'
          },
          ],
          ...this.list.map(ed => {
            return [ed.diseaseMain.diseaseCategoryName, ed.diseaseSub.diaseName, ed.description];
          })
        ]
      }
    };
  }

  getDetail(id){
    this.service.getDetails(id).subscribe((data)=>{
      if(data.success){
        this.model = data.dynamicClass as CustomerHealthModel;
        this.buttonText = Constants.Update;
      }
    })
  }

  getCustomerDetail(){
    this.customerService.getDetails(this.selectedCustomerId).subscribe((data)=>{
      if(data.success){
        this.customer = data.dynamicClass as Customer;
        this.customerName = this.customer.name+' '+this.customer.surname;
      }
    })
  }

  getDiseaseMainList(){
    this.diseaseMainService.getList().subscribe((data)=>{
      if(data.success){
        this.diseaseMainList = data.dynamicClass as DiseaseMainModel[];
      }
    })
  }

  getDiseaseSubList(id:number){
    this.diseaseMainService.getListSub(id).subscribe((data)=>{
      if(data.success){
        this.diseaseSubList = data.dynamicClass as DiseaseSubModel[];
      }
    })
  }

  onChangeSubDisease(id:number){
    this.diseaseMainService.getDetailSub(id).subscribe((data)=>{
      if(data.success){
        const subModel = data.dynamicClass as DiseaseSubModel;
        this.isRequeiredDescription = subModel.isRequiredDescription;
      }
    })
  }

  getList(){
    this.service.getList(this.selectedCustomerId).subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as CustomerHealthModel[];
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add(){
    if(this.model.id == 0){
      this.service.add(this.model).subscribe((data)=>{
        if(data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }
      })
    }else{
      this.service.update(this.model).subscribe((data)=>{
        if(data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }
      })
    }
  }

  reset(){
    this.ngOnInit();
  }

}
