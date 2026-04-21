import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupStepModel } from 'src/app/shared/model/setup-step-model';
import { StepModel } from 'src/app/shared/model/step-model';
import { StepsService } from 'src/app/shared/services/steps.service';

@Component({
  selector: 'app-register-wizard-steps',
  templateUrl: './register-wizard-steps.component.html',
  styleUrls: ['./register-wizard-steps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterWizardStepsComponent implements OnInit {

  steps: Observable<StepModel[]>;
  currentStep: Observable<StepModel>;
  setupStepList: SetupStepModel[] = [];

  constructor(private stepsService: StepsService) { }

  ngOnInit() {
    this.steps = this.stepsService.getSteps();
    /*this.stepsService.getList().subscribe((data)=>{
      this.setupStepList = data.dynamicClass as SetupStepModel[];
      this.steps.subscribe((stepList)=>{
        this.setupStepList.forEach((step)=>{
          let props = Object.getOwnPropertyNames(step);
          props.forEach((prop)=>{
            var selectedStep = stepList.find(s => s.serverName === prop);
            if(selectedStep !== undefined){
              selectedStep.isComplete = step[prop];
            }
          });
        });
      });
    });*/
  }


  onStepClick(step: StepModel) {
    this.stepsService.setCurrentStep(step);
  }

}
