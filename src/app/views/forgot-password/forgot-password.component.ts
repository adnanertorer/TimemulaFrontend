import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared';
import { ForgotPasswordModel } from 'src/app/shared/model/forgot-password-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  forgotPasswordModel: ForgotPasswordModel;
   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
    ) {}

  ngOnInit() {
    this.forgotPasswordModel = {
      email: ""
    };
  }

  sendForgotPasswordRequest() {
    this.authService
      .sendForgotPasswordRequest(this.forgotPasswordModel)
      .subscribe(
        (data) => {
          if(data.success === true) {
            alert(data.clientMessage);
            this.router.navigate(['']);
          }else{
            alert(data.clientMessage);
          }
        }, (err) => {
          console.log(err);
        }
      );
  }

}
