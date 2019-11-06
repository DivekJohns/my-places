import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../shared/material-module/material.module";
import { RouterModule } from "@angular/router";
import { Startup } from "./startup.routing";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StartupComponent } from "./startup.component";
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        StartupComponent
    ],
    imports: [
        MaterialModule,
        RouterModule.forChild(Startup),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [AccountService],
})
export class StartupModule {
}
