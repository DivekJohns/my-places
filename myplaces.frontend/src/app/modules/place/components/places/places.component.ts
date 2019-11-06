import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PlaceService} from 'src/app/shared/services/service/place.service';
import {Place} from '../../../../shared/models/Place';

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {


    places: Place [];
    load = true;
    searchText: string;

    constructor(
            private router: Router,
            private service: PlaceService
        ) { }

    ngOnInit(): void {
        /**
         * @description gets pet observable
         */
        this.service.getPlacesObservable().subscribe((places: Place[]) => {
                this.load = false;
                this.places = places;
        }, err => {
            this.load = false;
            console.warn('Unable to get all the place details', err);
        });
    }
    /**
     * @description navigate to add place  page
     */
   async addPlace() {
       await this.router.navigate(['/dashboard/places/details'], { queryParams: { type: 'add-place' } });
    }
    /**
     * @description navigate to place details page
     * @param accepts place object
     */
    async placeDetails(place: Place) {
        this.service.setPlaceDetails(place);
        await this.router.navigate(['/dashboard/places/details'], { queryParams: { type: 'place-details', id: place._id } });
    }
}
