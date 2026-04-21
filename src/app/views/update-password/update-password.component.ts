import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared';
import { UpdatePasswordModel } from 'src/app/shared/model/update-password-model';
declare let alertify: any;

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  model: UpdatePasswordModel;
  updatePasswordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
  ) { }

  ngOnInit() {
    this.model = {
      newPassword: '',
      oldPassword: '',
      passwordAgain: '',
    }

    this.updatePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      oldPassword: ['', [Validators.required]],
      passwordAgain: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const newPassword = formGroup.get('newPassword')?.value;
    const passwordAgain = formGroup.get('passwordAgain')?.value;
  
    if (newPassword && passwordAgain && newPassword !== passwordAgain) {
      return { passwordsMismatch: true };
    }
  
    return null;
  }

  updatePassword() {
    if (this.updatePasswordForm.valid) {
      const formValues = this.updatePasswordForm.value;

      this.model.newPassword = formValues.newPassword;
      this.model.oldPassword = formValues.oldPassword;
      this.model.passwordAgain = formValues.passwordAgain;

      this.service.updatePasswordRequest(this.model).subscribe(data => {
        if(data.success){
          alertify.success(data.clientMessage, 2);
        }else{
          alertify.error(data.clientMessage, 3);
        }
      }, err => {
        alertify.error(err.message, 3);
      });
    }
  }
}
