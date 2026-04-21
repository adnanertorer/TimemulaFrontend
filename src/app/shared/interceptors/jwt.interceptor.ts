import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>>{
        const accessToken = localStorage.getItem(environment.access_token_name);
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (accessToken && isApiUrl){
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}`},
            });
        }
        return next.handle(request);
    }
}