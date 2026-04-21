import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StepModel } from 'src/app/shared/model/step-model';

@Component({
  selector: 'app-step-template',
  templateUrl: './step-template.component.html',
  styleUrls: ['./step-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StepTemplateComponent implements OnInit {

  @Input() step: StepModel;
  
  constructor() { }

  ngOnInit() {
  }

  onCompleteStep() {
    this.step.isComplete = true;
  }

}
