import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegistration } from '../interfaces/user-for-registration.model';
import { RequestService } from '../shared/services/request.service';
import { PasswordConfirmationValidatorService } from '../shared/custom-validators/password-confirmation-validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  public errorMessages: string[];
  public showError: boolean;

  constructor(public requestService: RequestService, private _passConfValidator: PasswordConfirmationValidatorService,
    private _router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    });
    this.registerForm.get('confirmPassword').setValidators([Validators.required,
      this._passConfValidator.validateConfirmPassword(this.registerForm.get('password'))]);
  }

  public validateControl(controlName: string) {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName)
  }

  public registerUser(registerFormValue) {
    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: UserForRegistration = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword
    };

    this.requestService.registerUser(user)
    .subscribe(_ => {
      this._router.navigate(["/login"]);
    },
    error => {
      this.errorMessages = error;
      this.showError = true;
    })
  }

}
