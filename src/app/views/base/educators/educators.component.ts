import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-educators',
  templateUrl: './educators.component.html',
  styleUrls: ['./educators.component.css']
})
export class EducatorsComponent implements OnInit {

  educators: StaffModel[] = [];
  displayedColumns: string[] = ['id', 'identityNumber', 'name', 'gsm', 'email', 'gender'];
    dataSource: MatTableDataSource<StaffModel>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(private service: StaffService, private router: Router) { }

  ngOnInit() {
    this.service.getTeachers().subscribe((data)=>{
      this.educators = data.dynamicClass as StaffModel[];
      this.dataSource = new MatTableDataSource(this.educators);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPackages(val) {
    this.router.navigate(['actual-hareketler/egitmen-paketleri.html/', val]);
  }

  getPreparePrice(val) {
    this.router.navigate(['actual-hareketler/egitmen-hakedis-girisi.html/', val]);
  }

  resetForm(){
    this.ngOnInit();
  }

 

}
