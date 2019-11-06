import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {PlaceRoutes} from './place.routing';
import {PlaceComponent} from './place.component';
import {PlaceDetailsComponent} from './components/place-details/place-details.component';
import {PlacesComponent} from './components/places/places.component';
import {MaterialModule} from '../../shared/material-module/material.module';


import {HttpService} from '../../shared/services/http/http.service';
import { SearchPipe } from 'src/app/search.pipe';


@NgModule({
    declarations: [
        PlaceComponent,
        PlaceDetailsComponent,
        PlacesComponent,
        SearchPipe,
    ],
    imports: [
        RouterModule.forChild(PlaceRoutes),
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ HttpService]
})
export class PlaceModule {
}
