import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.css"]
})
export class HeaderMenuComponent {
  constructor(private router: Router) {}

  isUserAuthenticated() {
    const token: string = localStorage.getItem("accessToken");
    const jwtHelper = new JwtHelperService();
    return token && !jwtHelper.isTokenExpired(token);
  }

  // Method navigation
  logOut() {
    localStorage.removeItem("accessToken");
    this.router.navigateByUrl("/login");
  }
}
