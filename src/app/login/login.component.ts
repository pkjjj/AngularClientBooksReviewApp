import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response';
import { UserForAuthentication } from '../interfaces/user-for-authentication';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;

  constructor(private _authenticationService: AuthenticationService, private _requestService: RequestService, private _router: Router, private _route: ActivatedRoute) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser = (loginFormValue) => {
    this.showError = false;
    const login = { ... loginFormValue };
    const userForAuth: UserForAuthentication = {
      email: login.username,
      password: login.password
    }
    //check token
    this._requestService.loginUser(userForAuth)
    .subscribe((res:AuthResponse) => {
      localStorage.setItem("token", res.token);
      this._authenticationService.sendAuthStateChangeNotification(res.isAuthSuccessful);
      this._router.navigate(['/books']);
    },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    });
  }
}
