import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PariticipantTypeModel } from 'src/app/shared/model/pariticipant-type-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ParticipantTypeService } from 'src/app/shared/services/participant-type.service';
declare let alertify: any;

@Component({
  selector: 'app-participant-type',
  templateUrl: './participant-type.component.html',
  styleUrls: ['./participant-type.component.css'],
})
export class ParticipantTypeComponent implements OnInit {
  participantType: PariticipantTypeModel;
  list: PariticipantTypeModel[] = [];
  form: UntypedFormGroup;
  pageOfItems: Array<any>;
  buttonText = 'Kaydet';
  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;
  @ViewChild('participantTypePaginator') paginator: MatPaginator;

  constructor(private service: ParticipantTypeService) {}

  ngOnInit() {
    this.participantType = {
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      participantTypeName: '',
    };

    this.form = new UntypedFormGroup({
      participantTypeName: new UntypedFormControl(
        this.participantType.participantTypeName,
        Validators.required,
      ),
    });

    this.getList();
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getList();
  }

  getDetailFromTable(resource: any): void {
    this.participantType = resource;
    this.buttonText = 'Güncelle';
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  reset(): void {
    this.buttonText = 'Kaydet';
    this.ngOnInit();
  }

  add(): void {
    if (this.participantType.id == 0) {
      this.service.add(this.participantType).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.participantType).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    }
  }

  getList(): void {
    const pageRequest: PageRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      isAllItems: false,
    };
    this.service.getList(pageRequest).subscribe((data) => {
      const response = data as PaginateResponse<PariticipantTypeModel>;
      this.list = response.dynamicClass.items as PariticipantTypeModel[];
      this.total = response.dynamicClass.count;
      this.pageIndex = response.dynamicClass.index;

      this.paginator.pageIndex = this.pageIndex;
      this.paginator.length = this.total;
    });
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
