import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {accountApiRoutes} from '../account-api-routes';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };

    constructor(private http: HttpClient) {
    }

    loginUser(body: { email: string, password: string }) {
        return this.http.post(accountApiRoutes.loginUser, body, this.httpOptions);
    }

    registerUser(body: any) {
        return this.http.post(accountApiRoutes.registerUser, body, this.httpOptions);
    }
}
