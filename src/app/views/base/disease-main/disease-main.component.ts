import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app';
import { DiseaseMainModel } from 'src/app/shared/model/disease-main-model';
import { DiseaseMainService } from 'src/app/shared/services/disease-main.service';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-disease-main',
  templateUrl: './disease-main.component.html',
  styleUrls: ['./disease-main.component.css'],
})
export class DiseaseMainComponent implements OnInit {
  model: DiseaseMainModel | undefined;
  list: DiseaseMainModel[] = [];

  buttonText: string = Constants.Save;
  displayColums: string[] = ['diseaseCategoryName', 'isActive', 'id'];
  dataSource: MatTableDataSource<DiseaseMainModel> | undefined;

  @ViewChild('paginatorDiseaseMain') paginator: MatPaginator | undefined;
  @ViewChild('diseaseMainSort') sort: MatSort | undefined;

  constructor(
    private service: DiseaseMainService,
    private router: Router,
    private authService: AuthService,
  ) {}

  canAccess(permissionCode: string): boolean {
    return this.authService.hasPermission(permissionCode);
  }

  ngOnInit() {
    this.buttonText = Constants.Save;
    this.model = {
      createdAt: new Date(),
      createdBy: 0,
      diseaseCategoryName: '',
      id: 0,
      isActive: true,
    };
    this.getList();
  }

  getList() {
    this.service.getList().subscribe((data) => {
      if (data.success) {
        this.list = data.dynamicClass as DiseaseMainModel[];
        this.dataSource = new MatTableDataSource(this.list);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
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

  getDetail(id: number) {
    this.service.getDetails(id).subscribe((data) => {
      if (data.success) {
        this.model = data.dynamicClass as DiseaseMainModel;
        this.buttonText = Constants.Update;
      }
    });
  }

  add() {
    if (this.model && this.model.id == 0) {
      this.service.add(this.model).subscribe((data) => {
        if (data.success) {
          alert(data.clientMessage);
          this.ngOnInit();
        }
      });
    } else if (this.model) {
      this.service.update(this.model).subscribe((data) => {
        if (data.success) {
          alert(data.clientMessage);
          this.ngOnInit();
        }
      });
    }
  }

  reset() {
    this.ngOnInit();
  }

  getSubs(id: number) {
    this.router.navigate([
      'genel-tanimlar/genel-saglik-sorunlari-alt-basliklar.html',
      id.toString(),
    ]);
  }
}
