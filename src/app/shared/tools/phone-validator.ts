import { AbstractControl, ValidationErrors} from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phoneRegex = /^[5-9]\d{9}$/;
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhone: true };
}