import {Injectable} from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class CoreHttpService {
    public user;
    constructor(public userService: UserService) {
        this.userService.getUser().subscribe((user: any) => {
            this.user = user;
        });
    }
}
