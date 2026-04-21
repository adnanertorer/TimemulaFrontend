import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ParticipantModel } from 'src/app/shared/model/participant-model';
import { PageRequest } from 'src/app/shared/requests/page.request';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { ParticipantService } from 'src/app/shared/services/participant.service';
declare let alertify: any;

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css'],
})
export class ParticipantComponent implements OnInit {
  participant: ParticipantModel;
  list: ParticipantModel[] = [];
  form: UntypedFormGroup;
  pageOfItems: Array<any>;
  buttonText = 'Kaydet';
  @ViewChild('participantPaginator') paginator: MatPaginator;

  total: number = 0;
  pageIndex: number = 0;
  pageSize: number = 50;

  constructor(private service: ParticipantService) {}

  ngOnInit() {
    this.participant = {
      createdAt: new Date(),
      createdBy: 0,
      id: 0,
      isActive: true,
      participantName: '',
    };

    this.form = new UntypedFormGroup({
      participantName: new UntypedFormControl(
        this.participant.participantName,
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
    this.participant = resource;
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
    if (this.participant.id == 0) {
      this.service.add(this.participant).subscribe(
        (data) => {
          if (data.success) {
            this.ngOnInit();
            alertify.set('notifier', 'position', 'top-right');
            alertify.success(data.clientMessage, 2);
          }
        }
      );
    } else {
      this.service.update(this.participant).subscribe(
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
      const response = data as PaginateResponse<ParticipantModel>;
      this.list = response.dynamicClass.items as ParticipantModel[];
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
