import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {AppRoutes} from './app-router';
import {AppComponent} from './app.component';
import {MaterialModule} from './shared/material-module/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './page-not-found.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {UserService} from './shared/services/user.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {PlaceService} from './shared/services/service/place.service';
import {NotificationService} from './shared/services/notification.service';
import {NotificationComponent} from './common/notification/notification.component';



@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        NotificationComponent
    ],
    imports: [
        FormsModule,
        MDBBootstrapModule.forRoot(),
        MaterialModule,
        RouterModule.forRoot(AppRoutes, { scrollPositionRestoration: 'top' }),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
    ],
    exports: [
        BrowserAnimationsModule
    ],
    providers: [UserService, { provide: LocationStrategy, useClass: HashLocationStrategy }, PlaceService, NotificationService],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
