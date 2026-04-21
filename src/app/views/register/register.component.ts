import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared';
import { BaseResponse } from 'src/app/shared/model/BaseResponse';
import { TokenModel } from 'src/app/shared/model/TokenModel';
import { CityModel } from 'src/app/shared/model/city-model';
import { DistrictModel } from 'src/app/shared/model/district-model';
import { RegisterCompanyModel } from 'src/app/shared/model/register-company-model';
import { CityService } from 'src/app/shared/services/city-service.service';
declare let alertify: any;

@Component({
  selector: 'app-register-main',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterCompanyModel;
  passwordAgain: string = "";
  registerForm: FormGroup;
  cities: CityModel[] = [];
  districts: DistrictModel[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private cityService: CityService
  ) { }

  ngOnInit(): void {

    this.getCities();
    this.model = {
      companyAddress: '',
      companyName: '',
      companyPhone: '',
      email: '',
      name: '',
      password: '',
      surname: '',
      cityId: 0,
      districtId: 0
    };

    this.registerForm = this.fb.group({
      companyName: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required],
      companyPhone: [
        '',
        [Validators.required, Validators.pattern(/^[5-9]\d{9}$/)]
      ],
      companyAddress: ['', Validators.required],
      cityId: [0, Validators.required],
      districtId: [0, Validators.required]
    });
  }

  getCities(){
    this.cityService.getList().subscribe((res) => {
      this.cities = res.dynamicClass as CityModel[];
    });
  }

  cityOnChange(id) {
    this.getDistricts(id);
  }

  getDistricts(cityId: number){
    this.cityService.getDistricts(cityId).subscribe((res) => {
      this.districts = res.dynamicClass as DistrictModel[];
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      if (formValues.password === formValues.passwordAgain) {
        const model: RegisterCompanyModel = {
          companyName: formValues.companyName,
          companyAddress: formValues.companyAddress,
          companyPhone: formValues.companyPhone,
          email: formValues.email,
          name: formValues.name,
          password: formValues.password,
          surname: formValues.surname,
          cityId: formValues.cityId,
          districtId: formValues.districtId,
        };

        this.service.registerCompany(model).subscribe((res) => {
          if (res.success) {
            const response = res as BaseResponse;
            if(response.success){
              const tokenModel = response.dynamicClass as TokenModel;

              this.service._user.next({
                email: model.email,
                accessToken: tokenModel.token,
                fullName: model.name + ' ' + model.surname,
                password: '',
                refreshToken: ''
              });
  
              this.service.setLocalStorage(tokenModel);
              this.service.startTokenTimer();
              this.router.navigate(['form']);
            }else{
              alertify.error(response.clientMessage, 3);
            }
          }
        });
      } else {
        alert('Parolalar uyuşmuyor');
      }
    } else {
      alert('Lütfen formu eksiksiz ve doğru doldurunuz.');
    }
  }
  login() {
    this.router.navigate(['login']);
  }
}
