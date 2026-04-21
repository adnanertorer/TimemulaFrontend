import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VCustomer } from 'src/app/shared/model/v-customer';
import { CustomerService } from 'src/app/shared/services/customer.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  vcustomer: VCustomer;
  constructor(private service: CustomerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.vcustomer = {
      address:'',
      birthPlace: '',
      birthDate: new Date(),
      citizenIdentityNumber: '',
      email: '',
      emailRequest: false,
      gender: '',
      gsm: '',
      id: 0,
      isActive: true,
      isChild: false,
      name: '',
      smsRequest: false,
      surname: '',
      blood_group_id: 0,
      blood_group_name: '',
    };
    this.activatedRoute.params.subscribe(params => {
      const id = parseInt(params["id"]);
      this.getDetail(id);
    });
  }

  getDetail(id: number){
    this.service.getDetails(id).subscribe((data)=>{
      if(data.success){
        this.vcustomer = data.dynamicClass as VCustomer;
      }
    })
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.setTextColor('black');
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.vcustomer.citizenIdentityNumber+'_profil.pdf');
    });
  }

}
