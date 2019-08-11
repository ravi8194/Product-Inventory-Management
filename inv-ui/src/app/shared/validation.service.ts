import { AbstractControl } from '@angular/forms';
export class ValidationService {
  static required(control) {
    if (
      control.value === undefined ||
      control.value === null ||
      (typeof control.value === 'string' && control.value.trim() === '')
    ) {
      return { required: true };
    }
    return null;
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    const reg = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]{2,}(?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
    if (typeof control.value !== 'undefined' && reg.test(control.value)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control) {
    // {6,15}           - Assert password is between 6 and 15 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    const reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;
    if (typeof control.value !== 'undefined' && reg.test(control.value)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
}
