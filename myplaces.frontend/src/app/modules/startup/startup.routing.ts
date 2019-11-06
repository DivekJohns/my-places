import {Route} from '@angular/router';
import {StartupComponent} from "./startup.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

export const Startup: Route[] = [
    {
        path: '',
        component: StartupComponent,
        children: [
            {path: '', component: LoginComponent, data: {animation: 'pets'}},
            {path: 'register', component: RegisterComponent, data: {animation: 'details'}},
            {
                path: 'register/:inviteToken',
                component: RegisterComponent,
            },
        ]
    }
];