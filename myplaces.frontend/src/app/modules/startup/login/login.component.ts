import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from '../services/account.service';
import {AuthGuardService} from 'src/app/shared/services/guards/auth-guard.service';
import {UserService} from 'src/app/shared/services/user.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Response } from 'src/app/shared/services/http/http.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    users: any;
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/)]),
        password: new FormControl('', [Validators.required]),
    }, { updateOn: 'submit' });
    hide = false;
    matErr: boolean;
    loader = false;
    config: MatSnackBarConfig = {
        panelClass: ['snackBar-invalid'],
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
    };


    constructor(
        public router: Router,
        public accountService: AccountService,
        public auth: AuthGuardService,
        public userService: UserService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        if (this.auth.canActivate()) {
            this.router.navigate(['dashboard']);
        }
    }

    /**
     * @description: To open the snack bar
     * @param:       accepts a string, passing the user with an error message
     */
    openSnackBar(message): void {
        this.snackBar.open(message, '', {
            data: message,
            ...this.config
        });
    }

    loginUser(): void {
        this.matErr = true;
        if (!this.loginForm.valid) { return; }
        this.loader = true;
        this.accountService.loginUser(this.loginForm.value).subscribe(async (response: Response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', response.user._id);
            this.userService.setUser(response.user);
            this.snackBar.dismiss();
            await this.router.navigate(['dashboard']);
        }, err => {
            this.loader = false;
            console.log(err);
            this.openSnackBar(err.error.message);
        });
    }
}
