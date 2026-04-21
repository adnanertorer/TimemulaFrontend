import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VInstallmentMainModel } from 'src/app/shared/model/v-installment-main-model';
import { CustomerInstallmentService } from 'src/app/shared/services/customer-installment.service';

@Component({
  selector: 'app-customer-installment-list',
  templateUrl: './customer-installment-list.component.html',
  styleUrls: ['./customer-installment-list.component.css']
})
export class CustomerInstallmentListComponent implements OnInit {

  installmentList: VInstallmentMainModel[] = [];
  displayedColumns: string[] = ['name', 'mainDept', 'totalInstallment', 'interestPercent', 'interestAmount', 'withInterestAmount', 'paymentAmount', 
   'dayNumber', 'createdByName', 'id'];
  dataSource: MatTableDataSource<VInstallmentMainModel>;
  @ViewChild('installmentPaginator') paginator: MatPaginator;
  @ViewChild('installmentSort') sort: MatSort; 

  constructor(private service: CustomerInstallmentService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.service.getList().subscribe((data)=>{
      if(data.success){
        this.installmentList = data.dynamicClass as VInstallmentMainModel[];
        this.dataSource = new MatTableDataSource(this.installmentList);
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

  openDetailList(id: number){
    this.router.navigate(['cari-hesaplar/musteri-taksit-listesi.html/', id]);
  }

}
