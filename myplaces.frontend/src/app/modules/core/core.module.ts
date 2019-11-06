import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreComponent } from './core.component';
import { RouterModule } from '@angular/router';
import { CoreRoutes } from './core-router';
import { MaterialModule } from '../../shared/material-module/material.module';
import { SettingsComponent } from '../../@unimplemented-components/settings/settings.component';



@NgModule({
    declarations: [
        CoreComponent,
        SettingsComponent,
    ],
    imports: [
        RouterModule.forChild(CoreRoutes),
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [],
    providers: []
})
export class CoreModule {
}
