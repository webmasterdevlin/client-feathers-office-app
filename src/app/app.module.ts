import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { HttpInterceptorModule } from "./auth/http-interceptor.module";
import { SignupComponent } from "./components/signup/signup.component";
import { UserService } from "./services/user.service";
import { ShellLayoutComponent } from "./components/shell/shell-layout.component";
import { HeaderMenuComponent } from "./components/shell/header-menu/header-menu.component";
import { ShellComponent } from "./components/shell/shell.component";
import { LogoutComponent } from "./components/logout/logout.component";

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HeaderMenuComponent,
    ShellLayoutComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpInterceptorModule,
    RouterModule.forRoot([
      {
        path: "",
        component: ShellLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "",
            component: ShellComponent,
            canActivate: [AuthGuard],
            loadChildren: "./components/shell/shell.module#ShellModule"
          }
        ]
      },
      { path: "authentication", component: LoginComponent },
      { path: "logout", component: LogoutComponent },
      { path: "signup", component: SignupComponent },
      { path: "**", redirectTo: "" }
    ])
  ],
  providers: [AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
