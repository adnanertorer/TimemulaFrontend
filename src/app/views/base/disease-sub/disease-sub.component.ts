import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DiseaseMainModel } from 'src/app/shared/model/disease-main-model';
import { DiseaseSubModel } from 'src/app/shared/model/disease-sub-model';
import { DiseaseMainService } from 'src/app/shared/services/disease-main.service';
import Constants from 'src/app/shared/tools/constants';

@Component({
  selector: 'app-disease-sub',
  templateUrl: './disease-sub.component.html',
  styleUrls: ['./disease-sub.component.css']
})
export class DiseaseSubComponent implements OnInit {

  mainName:string = '';
  model: DiseaseSubModel;
  list: DiseaseSubModel[] = [];
  selectedMainId: number = 0;
  buttonText: string = Constants.Save;

  displayColums: string[] = ['diaseName', 'isActive', 'isRequiredDescription', 'id'];
  dataSource: MatTableDataSource<DiseaseSubModel>;

  @ViewChild('paginatorDiseaseSub') paginator: MatPaginator;
  @ViewChild('diseaseSubSort') sort: MatSort;
  
  constructor(private service: DiseaseMainService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buttonText = Constants.Save;
    this.model = {
      createdAt: new Date(),
      diaseMainId: 0,
      diaseName: '',
      id: 0,
      isActive: true,
      createdBy: 0,
      description: '',
      isRequiredDescription: false
    };
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      this.selectedMainId = parseInt(id);
      this.model.diaseMainId = this.selectedMainId;
      this.getMainDetail();
      this.getList();
    });
  }

  getMainDetail(){
    this.service.getDetails(this.selectedMainId).subscribe((data)=>{
      if(data.success){
        const mainModel = data.dynamicClass as DiseaseMainModel;
        this.mainName = mainModel.diseaseCategoryName;
      }
    })
  }

  getList(){
    this.service.getListSub(this.selectedMainId).subscribe((data)=>{
      if(data.success){
        this.list = data.dynamicClass as DiseaseSubModel[]; 
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

  getDetail(id){
    this.service.getDetailSub(id).subscribe((data)=>{
      if(data.success){
        this.model = data.dynamicClass as DiseaseSubModel;
        this.buttonText = Constants.Update;
      }
    })
  }

  add(){
    if(this.model.id == 0){
      this.service.addSub(this.model).subscribe((data)=>{
        if(data.success){
          alert(data.clientMessage);
          this.ngOnInit();
        }
      })
    }else{
      this.service.updateSub(this.model).subscribe((data)=>{
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
