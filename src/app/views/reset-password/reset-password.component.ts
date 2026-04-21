import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared';
import { ResetPasswordModel } from 'src/app/shared/model/reset-password-model';
import { StatusModel } from 'src/app/shared/model/status-model';
declare let alertify: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordModel: ResetPasswordModel;
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
      ) {}

  ngOnInit() {
    this.resetPasswordModel = {
      code: "",
      password: "",
      passwordAgain: ""
    };
    this.route.params.subscribe(params => {
      const token = params["token"];
      this.resetPasswordModel.code = token;
    });
  }

  sendResetRequest() {
    if(this.resetPasswordModel.password == this.resetPasswordModel.passwordAgain){
      this.authService
      .resetPasswordRequest(this.resetPasswordModel)
      .subscribe(
        (data) => {
          if(data.success){
           const result = data.dynamicClass as StatusModel;
           if(result.status == true){
            this.router.navigate(['/']);
           }else{
            alertify.error("Böyle bir aktivasyon bulunamadı ya da daha önce kullanılmış bir aktivasyonu tekrar deniyorsunuz", 2);
           }
          }
        }
      );
    }else{
      alertify.error("Parolalar uyuşmuyor", 2);
    }
    
  }

}
