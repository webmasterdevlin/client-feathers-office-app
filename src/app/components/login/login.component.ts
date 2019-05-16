import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UserModel } from "../../models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
  }

  formBuilderInit(): void {
    this.loginForm = this.fb.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required],
      strategy: "local"
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    // You can validate all your fields here before sending loginForm
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.sendLoginForm();
  }

  private sendLoginForm(): void {
    const loginModel = this.loginForm.value;
    this.userService.signin(loginModel).subscribe(
      response => {
        const token = (<any>response).accessToken;

        console.log("new token: ", JSON.stringify(token));

        localStorage.setItem("accessToken", token);

        console.log("token has been stored locally");

        this.invalidLogin = false;
        this.router.navigate(["/home"]);
      },
      err => {
        this.invalidLogin = true;
        alert(err.message);
      }
    );
  }

  reset() {
    const response = prompt("Enter your email here");
    if (response) {
      alert("Please check your email");
      return;
    }
    alert("Please try again");
  }
}
