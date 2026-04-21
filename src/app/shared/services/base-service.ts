import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../model/BaseResponse';

@Injectable({
  providedIn: 'root'
})

export class BaseService {

    private readonly apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient) { }

    sendData<BaseResponse>(url: string, body?: any){
        return this.http
        .post<BaseResponse>(url, body)
        .pipe(
            map((x)=> {
                return x;
            })
        );
    }
}
