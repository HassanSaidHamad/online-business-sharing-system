import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    httpRequest: HttpRequest<unknown>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      httpRequest.url.includes(
        `${this.authenticationService.apiUrl}/auth/login`
      )
    ) {
      httpHandler.handle(httpRequest);
    }

    if (
      httpRequest.url.includes(
        `${this.authenticationService.apiUrl}/api/users/registerStudent`
      )
    ) {
      httpHandler.handle(httpRequest);
    }

    const credentials = 'TXJfTmV2ZXI1Om5ldmVyMTIzJQ==';
    const request = httpRequest.clone({
      setHeaders: { Authorization: `Basic ${credentials}` },
    });
    return httpHandler.handle(request);
  }
}
