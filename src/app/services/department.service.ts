import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Endpoints } from "../helpers/constants";
import { DepartmentModel } from "../models/department.model";
import { AuthBearerAndContentTypeJsonHeaders } from "../helpers/httpHeaders";
import { ResponseModel } from '../models/response.model';

@Injectable()
export class DepartmentService {
  constructor(private _httpClient: HttpClient) {}

  loadDepartments(): Observable<ResponseModel> {
    return this._httpClient
      .get<ResponseModel>(
        `${Endpoints.departmentUrl}`,
        AuthBearerAndContentTypeJsonHeaders.options
      )
      .pipe(

        catchError((err: HttpErrorResponse) => {
          return throwError(
            window.alert(
              `Something happened. Can't process right now. ${err.message}`
            )
          );
        })
      );
  }

  getDepartment(_id: string): Observable<DepartmentModel> {
    return this._httpClient
      .get<DepartmentModel>(`${Endpoints.departmentUrl}${_id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(
            window.alert(
              `Something happened. Can't process right now. ${err.message}`
            )
          );
        })
      );
  }

  postDepartment(department: DepartmentModel): Observable<any> {
    return this._httpClient
      .post<DepartmentModel>(`${Endpoints.departmentUrl}`, department)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(
            window.alert(
              `Something happened. Can't process right now. ${err.message}`
            )
          );
        })
      );
  }

  putDepartment(department: DepartmentModel): Observable<any> {
    console.log("DEPT ID IS ", department._id);
    return this._httpClient
      .put<DepartmentModel>(
        `${Endpoints.departmentUrl}${department._id}`,
        department
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(
            window.alert(
              `Something happened. Can't process right now. ${err.message}`
            )
          );
        })
      );
  }

  deleteDepartment(_id: string): Observable<any> {
    return this._httpClient
      .delete<DepartmentModel>(`${Endpoints.departmentUrl}${_id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(
            window.alert(
              `Something happened. Can't process right now. ${err.message}`
            )
          );
        })
      );
  }
}
