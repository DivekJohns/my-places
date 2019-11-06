import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from '../models/User';
import {HttpService, Response} from 'src/app/shared/services/http/http.service';
import {apiUrl} from 'src//environments/environment';

@Injectable()
/**
 * @description user service is a simple user provider which emits changes to subscribed components every function name is self explanatory
 */
export class UserService {

    private User = new ReplaySubject<User>(1);

    constructor(private http: HttpService) {
        if (localStorage.getItem('id') && localStorage.getItem('token')) {
            this.http.get(apiUrl + '/user-info/' + localStorage.getItem('id')).subscribe((response: Response) => {
                this.setUser(response.user);
            });
        }
    }

    getUser(): Observable<User> {
        return this.User.asObservable();
    }

    setUser(user: User): void {
        this.User.next(new User(user));
    }
}
