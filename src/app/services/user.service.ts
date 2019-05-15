import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { BaseUrl } from "../services/api.config";
import { Observable } from "rxjs";
import { LoginModel } from "../models/login.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  signin(loginModel: LoginModel): Observable<any> {
    return this.http.post<LoginModel>(BaseUrl.login, loginModel, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  signup(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(BaseUrl.register, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
