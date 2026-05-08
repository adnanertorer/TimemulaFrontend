import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app';
import { StaffModel } from 'src/app/shared/model/staff-model';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-educators',
  templateUrl: './educators.component.html',
  styleUrls: ['./educators.component.css'],
})
export class EducatorsComponent implements OnInit {
  educators: StaffModel[] = [];
  displayedColumns: string[] = [
    'id',
    'identityNumber',
    'name',
    'gsm',
    'email',
    'gender',
  ];
  dataSource: MatTableDataSource<StaffModel> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private service: StaffService,
    private router: Router,
    private authService: AuthService,
  ) {}

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }

  ngOnInit() {
    this.service.getTeachers().subscribe((data) => {
      this.educators = data.dynamicClass as StaffModel[];
      this.dataSource = new MatTableDataSource(this.educators);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  getPackages(val: any) {
    this.router.navigate(['actual-hareketler/egitmen-paketleri.html/', val]);
  }

  getPreparePrice(val: any) {
    this.router.navigate([
      'actual-hareketler/egitmen-hakedis-girisi.html/',
      val,
    ]);
  }

  resetForm() {
    this.ngOnInit();
  }
}
