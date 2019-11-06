import {Route} from '@angular/router';
import {CoreComponent} from './core.component';
import {SettingsComponent} from '../../@unimplemented-components/settings/settings.component';

export const CoreRoutes: Route[] = [

    {
        path: '',
        component: CoreComponent,
        children: [
            { path: '', redirectTo: 'places', pathMatch: 'full' },
            { path: 'settings', component: SettingsComponent},
            { path: 'places', loadChildren: '../place/place.module#PlaceModule'},
        ]
    }
];
