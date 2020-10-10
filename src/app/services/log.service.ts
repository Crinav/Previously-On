import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiKey = '5678b31cd6ca';
  url = 'https://api.betaseries.com/members/auth';

  constructor(private http: HttpClient) { }

  
  authData(login: string, password: string): Observable<any> {
    let body =
    {
      login:login,
      password:Md5.hashStr(password)
    }
    return this.http.post(`${this.url}?v=3.0&key=${this.apiKey}`, body).pipe(map(res => res));
  }
}
