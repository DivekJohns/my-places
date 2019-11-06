import { Route } from '@angular/router';
import { PlaceComponent } from './place.component';
import { PlacesComponent } from './components/places/places.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';

export const PlaceRoutes: Route[] = [
    {
        path: '',
        component: PlaceComponent,
        children: [
            { path: '', redirectTo: 'init', pathMatch: 'full' },
            { path: 'init', component: PlacesComponent, data: { animation: 'pets' } },
            { path: 'details', component: PlaceDetailsComponent, data: { animation: 'details' } },
        ]
    }
];
