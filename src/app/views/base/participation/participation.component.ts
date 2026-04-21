import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ParticipationModel } from 'src/app/shared/model/participation-model';
import { QueryParamaterListModel } from 'src/app/shared/model/query-paramater-list-model';
import { ParticipationService } from 'src/app/shared/services/participation.service';
declare let alertify: any;

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit {

  participationStatus: ParticipationModel;
  list: ParticipationModel[] = [];
  form: UntypedFormGroup;
  pageOfItems: Array<any>;
  buttonText = 'Kaydet';
  queryParameter: QueryParamaterListModel;
  constructor(private service: ParticipationService) { }

  ngOnInit() {
    this.queryParameter = {
      limit: 50,
      offset: 0,
      sortBy: 'asc'
    };
    this.participationStatus = {
      created_by: 0,
      id: 0,
      is_active: true,
      participation_status_name: ''
    };

    this.form = new UntypedFormGroup({
      'participation_status_name': new UntypedFormControl(this.participationStatus.participation_status_name, Validators.required)
    });

    this.getList();
  }

  onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  getDetailFromTable(resource: any): void {
    this.participationStatus = resource;
    this.buttonText = 'Güncelle';
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  reset(): void {
    this.buttonText = 'Kaydet';
    this.ngOnInit();
  }

  add(): void {
    if (this.participationStatus.id == 0) {
      this.service.add(this.participationStatus).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    } else {
      this.service.update(this.participationStatus).subscribe((data) => {
        if (data.success) {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'top-right');
          alertify.success(data.clientMessage, 2);
        }
      }, (err) => {
        alertify.error(err, 2);
      });
    }
  }

  getList(): void {
    this.service.getList(this.queryParameter).subscribe((data) => {
      this.list = data.dynamicClass as ParticipationModel[];
      this.pageOfItems = this.list;
    })
  }

  remove(id: number): void {
    this.service.remove(id).subscribe((data) => {
      if (data.success) {
        this.ngOnInit();
        alertify.set('notifier', 'position', 'top-right');
        alertify.success(data.clientMessage, 2);
      } else {
        alert(data.clientMessage);
      }
    });
  }

}
