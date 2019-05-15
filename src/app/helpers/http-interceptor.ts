import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  getToken(): string {
    return localStorage.getString("accessToken");
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getToken();

    if (token) {
      const newReq = req.clone({
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-cache"
        })
      });
      return next.handle(newReq);
    } else {
      return next.handle(req);
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
})
export class HttpInterceptorModule {}
