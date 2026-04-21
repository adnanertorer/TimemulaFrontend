import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseResponse } from 'src/app/shared/model/BaseResponse';
import { SetupStepModel } from 'src/app/shared/model/setup-step-model';
import { StatusModel } from 'src/app/shared/model/status-model';
import { StepModel } from 'src/app/shared/model/step-model';
import { StepsService } from 'src/app/shared/services/steps.service';

@Component({
  selector: 'app-register-form-page',
  templateUrl: './register-form-page.component.html',
  styleUrls: ['./register-form-page.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class RegisterFormPageComponent implements OnInit {

  currentStep: Observable<StepModel>;
  currentStepIndex: number = 0;

  constructor(private stepsService: StepsService, private router: Router) { }

  ngOnInit() {
    this.currentStep = this.stepsService.getCurrentStep().pipe(
      catchError((error) => {
        console.error('Step yüklenirken hata oluştu:', error);
        return of(null);  // Hata olursa boş step dön
      })
    );
   /* this.currentStep.subscribe((step) => {
      if(step.stepIndex !== 1){
        this.updateStepModel(step.stepIndex-1);
      }
    });*/
  }

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
    } else {
      this.onSubmit();
    }
  }

  onPreviousStep() {
    if (!this.stepsService.isFirstStep()) {
      this.stepsService.moveToPreviousStep();
    }
  }

  showButtonLabel() {
    return !this.stepsService.isLastStep() ? 'Sonraki Adım' : 'Kurulumu Tamamla';
  }

  onSubmit(): void {
    this.router.navigate(['dashboard']);
  }

  findCurrentStep(step: StepModel): number {
    for (let i = 1; i <= 9; i++) {
      if (step[`step${i}`] === `step${step.stepIndex}`) {
        return i;
      }
    }
    return 0;
  }
  
  updateStepModel(stepNumber: number) {
    this.stepsService.update(stepNumber).subscribe(
      (response) => {
        console.log('Step updated successfully:', response);
      },
      (error) => {
        console.error('Error updating step:', error);
      }
    );
  }
  
}
