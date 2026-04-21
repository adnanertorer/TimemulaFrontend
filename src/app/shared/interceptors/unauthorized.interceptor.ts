import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ErrorDialogService } from 'src/app/views/error/Error-Dialog/error-dialog.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
    id: 'default-alert',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorDialogService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.clearLocalStorage();
          this.router.navigate([''], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }

        if (err.status === 400) {
          console.log(err);
          let errorMessage = '';
          if (err.error) {
            console.log(err.error);
            const error = err.error;
            if (error.isValid != undefined && !error.isValid) {
              error.errors.forEach((element: { errorMessage: string }) => {
                errorMessage += '<p>' + element.errorMessage + '</p>';
              });
              this.errorService.error(errorMessage, this.options);
              return throwError(errorMessage);
            }
          }
        }

        if (err.status === 500) {
          console.log(err);
          this.errorService.error('Server Error', this.options);
          return throwError('Server Error');
        }

        if (!environment.production) {
          // console.error(err);
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        return throwError(error);
      }),
    );
  }
}
