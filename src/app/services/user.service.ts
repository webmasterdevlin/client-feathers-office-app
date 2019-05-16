import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { BaseUrl } from "./api.config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  signin(userModel: UserModel): Observable<any> {
    return this.http.post<UserModel>(BaseUrl.authentication, userModel, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  signup(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(BaseUrl.users, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
