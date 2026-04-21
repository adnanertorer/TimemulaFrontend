import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CashboxModel } from 'src/app/shared/model/cashbox-model';
import { EducatorCostModel } from 'src/app/shared/model/educator-cost-model';
import { LessonEducatorModel } from 'src/app/shared/model/lesson-educator-model';
import { PageRequestLessonById } from 'src/app/shared/requests/page_request_lesson_by_id';
import { PaginateResponse } from 'src/app/shared/responses/paginate.response';
import { CashboxService } from 'src/app/shared/services/cashbox.service';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';
declare let alertify: any;

@Component({
  selector: 'app-educator-lesson-cost-modal',
  templateUrl: './educator-lesson-cost-modal.component.html',
  styleUrls: ['./educator-lesson-cost-modal.component.css'],
})
export class EducatorLessonCostModalComponent implements OnInit {
  isManuelCost: boolean = false;
  educatorCost: EducatorCostModel;
  standardPrice: boolean = false;
  cashboxModelList: CashboxModel[] = [];
  selectedApproveNumber: number = 0;
  constructor(
    private service: EducatorCostService,
    public dialogRef: MatDialogRef<EducatorLessonCostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EducatorCostModel,
    private lessonEducatorService: LessonEducatorService,
    private cashBoxService: CashboxService,
  ) {}

  ngOnInit() {
    this.educatorCost = {
      cost: this.data.cost,
      createdAt: new Date(),
      description: this.data.description,
      id: this.data.id,
      educatorId: this.data.educatorId,
      createdBy: 0,
      staffName: this.data.staffName,
      classroomName: this.data.classroomName,
      lessonName: this.data.lessonName,
      lessonId: this.data.lessonId,
      cashBoxId: null,
      currentDate: this.data.currentDate,
      packageId: this.data.packageId,
      transactionType: 0,
      approveType: this.data.approveType
    };
    this.getCashBoxes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  approveChanged(value) {
    this.selectedApproveNumber = value;
    this.educatorCost.transactionType = this.selectedApproveNumber;
    if (this.selectedApproveNumber == 1) {
      this.isManuelCost = false;
      this.standardPrice = true;
      this.educatorCost.cashBoxId = null;
      this.educatorCost.cost = this.data.cost;
      this.educatorCost.description = 'Standart hakediş miktarı yansıtıldı.';
    } else if (this.selectedApproveNumber == 2) {
      this.isManuelCost = true;
      this.standardPrice = false;
      this.educatorCost.description = '';
      this.educatorCost.cost = 0;
    } else {
      this.isManuelCost = false;
      this.standardPrice = false;
      this.educatorCost.cost = 0;
      this.educatorCost.description = '';
    }
  }

  getCashBoxes() {
    this.cashBoxService.getList().subscribe((data) => {
      if (data.success) {
        this.cashboxModelList = data.dynamicClass as CashboxModel[];
      }
    });
  }

  add() {
    const selectedApprove = (<HTMLInputElement>(
      document.getElementById('costSettings')
    )).value;
    if (selectedApprove === '0') {
      alert('Lütfen bir uygulama seçin.');
    } else {
      if (this.educatorCost.cashBoxId && this.educatorCost.cashBoxId != 0) {
        this.educatorCost.cashBoxId = parseInt(
          this.educatorCost.cashBoxId.toString(),
        );
      }
      this.educatorCost.currentDate = new Date(this.educatorCost.currentDate);
      this.service.add(this.educatorCost).subscribe((data) => {
        if (data.success) {
          this.onNoClick();
        }
      });
    }
  }
}
