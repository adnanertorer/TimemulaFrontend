import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepModel, StepUpdateModel } from '../model/step-model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SetupStepModel } from '../model/setup-step-model';
import { BaseResponse } from '../model/BaseResponse';
import { map } from 'rxjs/operators';
import { StatusModel } from '../model/status-model';

const STEPS = [
  { stepIndex: 1, isComplete: false, stepName: 'Kategori Tanımları', serverName: 'step1' },
  { stepIndex: 2, isComplete: false, stepName: 'Alt Kategori Tanımları', serverName: 'step2' },
  { stepIndex: 3, isComplete: false, stepName: 'Ders/Hizmet Tanımları', serverName: 'step3' },
  { stepIndex: 4, isComplete: false, stepName: 'Ders/Hizmet Sınıf/Salon İlişkisi', serverName: 'step4' },
  { stepIndex: 5, isComplete: false, stepName: 'Personel', serverName: 'step5' },
  { stepIndex: 6, isComplete: false, stepName: 'Hizmet Veren/Hizmet İlişkisi', serverName: 'step6' },
  { stepIndex: 7, isComplete: false, stepName: 'Hizmet Veren Mesai Tanımları', serverName: 'step7' },
  { stepIndex: 8, isComplete: false, stepName: 'Hizmet Paketi Kayıtları', serverName: 'step8' },
  { stepIndex: 9, isComplete: false, stepName: 'Kasa Tanımları', serverName: 'step9' },
];

@Injectable({
  providedIn: 'root',
})
export class StepsService {

  private readonly apiUrl = `${environment.apiUrl}`;

  steps$: BehaviorSubject<StepModel[]> = new BehaviorSubject<StepModel[]>(
    STEPS
  );
  currentStep$: BehaviorSubject<StepModel> = new BehaviorSubject<StepModel>(
    null
  );

  constructor(private http: HttpClient) {
    this.currentStep$.next(this.steps$.value[0]);
  }

  setCurrentStep(step: StepModel): void {
    this.currentStep$.next(step);
  }

  getCurrentStep(): Observable<StepModel> {
    return this.currentStep$.asObservable();
  }

  getSteps(): Observable<StepModel[]> {
    return this.steps$.asObservable();
  }

  moveToNextStep(): void {
    const index = this.currentStep$.value.stepIndex;
    if (index < this.steps$.value.length) {
      this.checkSetupSteps(index).subscribe((data)=>{
        let result = data.dynamicClass as StatusModel;
        if(!result.status){
          alert('Lütfen bir sonraki adıma geçmek için mevcut adımı tamamlayınız.');
        }else{
          this.currentStep$.next(this.steps$.value[index]);
        }
      });
    }
  }

  moveToPreviousStep(): void {
    const index = this.currentStep$.value.stepIndex;
    if (index > 1) {
      this.currentStep$.next(this.steps$.value[index - 2]);
    }
  }

  isLastStep(): boolean {
    return this.currentStep$.value.stepIndex === this.steps$.value.length;
  }

  isFirstStep(): boolean {
    return this.currentStep$.value.stepIndex === 0;
  }

  update(stepNumber: number) {
    let stepUpdateModel: StepUpdateModel = {
      step: stepNumber
    };
    return this.http
      .put<BaseResponse>(`${this.apiUrl}/Company/UpdateSetupStep`, stepUpdateModel)
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  getList() {
    return this.http
      .get<BaseResponse>(`${this.apiUrl}/Company/SetupStepList`, { observe: 'body' })
      .pipe(
        map((x) => {
          return x;
        })
      );
  }

  checkSetupSteps(stepNumber: number){
    return this.http
    .get<BaseResponse>(`${this.apiUrl}/Company/CheckSetupStep/?step=${stepNumber.toString()}`, { observe: 'body' })
    .pipe(
      map((x) => {
        return x;
      })
    );
  }
}
