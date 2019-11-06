import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Place} from '../../models/Place';
import {User} from '../../models/User';

export interface Response {
    places?: Place[];
    place?: Place;
    updated?: Place;
    message?: string;
    user?: User;
    token?: string;
}

@Injectable({
  providedIn: 'root'
})

/**
 * @description HttpService service http call provider which appends user token/info and sends reponse to every user request
 * @methods GET PUT POST DELETE
 */
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    token: localStorage.getItem('token')
  };

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body, this.httpOptions);
  }

  get(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions);
  }
  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body, this.httpOptions);
  }
  delete(url): Observable<any> {
    return this.http.delete(url, this.httpOptions);
  }
}
