import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EducatorLessonCostModel } from 'src/app/shared/model/educator-lesson-cost-model';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';
import { EducatorLessonCostModalComponent } from '../educator-lesson-cost-modal/educator-lesson-cost-modal.component';

@Component({
  selector: 'app-educator-lesson-cost',
  templateUrl: './educator-lesson-cost.component.html',
  styleUrls: ['./educator-lesson-cost.component.css']
})
export class EducatorLessonCostComponent implements OnInit {

  modalData: EducatorLessonCostModel;
  educatorCost: EducatorLessonCostModel;
  constructor(private service: EducatorCostService, public dialog: MatDialog) { }

  ngOnInit() {
    
  }

  openDialog(): void {
    this.modalData = {
      cost: 0,
      createdAt: new Date(),
      description: '',
      id: 0,
      staffId: 0,
      actualCustomerLessonId: 0,
      createdBy: 0
    }
    const dialogRef = this.dialog.open(EducatorLessonCostModalComponent, {
      width: '600px',
      data: {cost: this.modalData.cost, description: this.modalData.description, staffId: this.modalData.staffId, 
        actualCustomerLessonId: this.modalData.actualCustomerLessonId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getCost(resource: any): void{
    this.modalData.actualCustomerLessonId = resource.actualCustomerLessonId;
    this.modalData.cost = resource.cost;
    this.modalData.description = resource.description;
    this.modalData.staffId = resource.staffId;
    this.openDialog();
  }
}
