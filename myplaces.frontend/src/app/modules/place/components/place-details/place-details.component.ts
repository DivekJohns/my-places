import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/shared/services/service/place.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { apiUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Response } from 'src/app/shared/services/http/http.service';
import { Meta } from '@angular/platform-browser';
import {Place} from '../../../../shared/models/Place';

@Component({
    selector: 'app-add-place',
    templateUrl: './place-details.component.html',
    styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent implements OnInit {


    placeDetails: FormGroup;
    date: Date = new Date();
    minDate: Date = new Date(new Date().setFullYear(this.date.getFullYear() - 18));
    maxDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    matErr = false;
    edit = false;
    placeProfile = 'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
    type: string;
    place: Place;
    placeId: string;
    spinner = 'none';
    newlyAddedImages = [];
    add = false;


    constructor(
        private placeService: PlaceService,
        public activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        public fb: FormBuilder,
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private notificationSvc: NotificationService,
        private meta: Meta
    ) {

    }

    ngOnInit(): void {
        this.placeId = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
        this.place = this.placeService.getPlaceDetails();
        this.activatedRoute.queryParams.subscribe(params => {
            /**
             * @description check if add or details or edit
             */
            switch (params.type) {
                case 'place-details':
                    this.placeService.getPlacesObservable().subscribe((data: Place[]) => {
                        if (data) { this.setPlaceInfo(data); }
                    }, err => {
                        this.notificationSvc.error('Failed to initialise place info, try to refresh your page');
                    });
                    this.edit = false;
                    break;
                case 'add-place':
                    this.add = true;
                    this.addPlace();
                    break;
                case 'edit-place':
                    this.editPlace();
                    break;
            }
        });
    }
    /**
     * @description sets places object to current page
     * @param accepts places object
     */
    setPlaceInfo(places: Place[]): void {
        this.placeId = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.place = places.find((place: Place) => place._id === this.placeId);
        if (this.place) {
            this.setMetaTags();
        }
    }
    /**
     * @description sets meta tag for facebook share page
     */
    setMetaTags() {
        this.meta.addTags([
            {
                property: 'og:url',
                content: `${location.href}`
            },
            {
                property: 'og:type',
                content: 'info'
            },
            {
                property: 'og:title',
                content: this.place.name
            },
            {
                property: 'og:description',
                content: `Hey! went to this  place ${this.place.name} on ${this.place.createdAt} which looks great`
            },
        ]);
    }
    /**
     * @description sets up empty values to place form
     */
    initialisePlaceDetails(): void {
        this.placeDetails = this.fb.group({
            name: ['', [Validators.required]],
            user: [localStorage.getItem('id'), [Validators.required]],
            address: [null, [Validators.required]],
            description: [null, [Validators.required]],
            images: [],
            createdAt: [],
        });
    }
    /**
     * @description sets up place to add place info
     */
    addPlace(): void {
        this.placeProfile = 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png';
        this.initialisePlaceDetails();
        this.edit = true;
    }
    /**
     * @description navigates to  edit
     */
    async  editPlaceNavigate(id: string) {
       await  this.router.navigate(['.'],
            { relativeTo: this.activatedRoute, queryParams: { type: 'edit-place', id }, queryParamsHandling: 'merge' });
    }
    /**
     * @description triggers edit functionality
     */
    editPlace(): void {
        if (this.place === undefined) {
            if (this.activatedRoute.snapshot.queryParamMap.has('id')) {
                this.placeService.getPlace(this.placeId).subscribe((data: Response) => {
                    this.initialisePlaceDetails();
                    this.placeDetails.patchValue(data.place);
                    this.place = data.place;
                    this.edit = true;
                    this.type = 'edit-place';
                });
                // should navigate to error page if the above returns an undefined
            } else {
                // the below  should be navigated to fallback  page
                this.router.navigate(['/dashboard/places']);
            }
        } else {
            // fallback handling
            this.initialisePlaceDetails();
            this.placeDetails.patchValue(this.place);
            this.edit = true;
        }
    }

    onCancelEditPlace(): void {
        this.location.back();
    }
    /**
     * @description uploads images if it is add place page
     * @param accepts event object
     */
    uploadImages(event: any): void {
        this.spinner = 'inherit';
        const files = event.target.files;
        if (files) {
            const formData: FormData = new FormData();
            for (const file of files) {
                formData.append('files', file, files.name);
            }
            formData.append('caption', this.place ? this.place.name : '');
            formData.append('userId', localStorage.getItem('id'));

            this.http.post(`${apiUrl}/upload`, formData)
                .subscribe(
                    (data: any) => {
                        this.spinner = 'none';
                        this.newlyAddedImages = data;
                    },
                    error => {
                        this.spinner = 'none';
                        this.notificationSvc.error('Failed to update a profile photo for your loved place');
                    }
                );
        }
    }

    /**
     * @description Submits updated  or added data from the form and operations based on query params
     */
    submitPlaceData(): void {
        this.matErr = true;
        if (this.placeDetails.valid) {
            if (this.type === 'add-place') {
                if (this.newlyAddedImages.length === 0) {
                    return this.notificationSvc.info('images are  required'); }
                this.placeDetails.value.images = this.newlyAddedImages.map((image) => image._id);
                this.placeService.addPlace(this.placeDetails.value).subscribe(async (data: Response) => {
                    await this.router.navigate(['/dashboard/places/details'],
                        { queryParams: { type: 'place-details', id: data.place._id } });
                    this.placeService.appendPlaceObservable(data.place);
                    this.edit = false;
                    this.matErr = false;
                    this.placeId = this.activatedRoute.snapshot.queryParamMap.get('id');
                    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
                }, err => {
                    this.notificationSvc.error(err.error.message);
                });

            } else {
                const newPlace = this.placeDetails.value;
                delete newPlace.images;
                this.placeService
                    .updatePlace(newPlace, this.activatedRoute.snapshot.queryParamMap
                        .get('id')).subscribe(async (data: Response) => {
                    this.placeService.updatePlaceObservable(data.updated);
                    this.setMetaTags(); // To reinitialise the meta Tags after place details has benn edited
                    const placeId = data.updated._id;
                    await this.router.navigate(['/dashboard/places/details'], { queryParams: { type: 'place-details', id: placeId } });
                    this.edit = false;
                    this.matErr = false;
                }, err => {
                    console.warn('unable to update a new place', err);
                    this.notificationSvc.error(err.error.message);
                });

            }

        } else {
            this.notificationSvc.info('fields required ');
            return;
        }
    }
    /**
     * @description deletes the current place which is displayed
     */
    deletePlace(): void {
        this.placeService.deletePlace(this.place._id).subscribe(async (data: Response) => {
            this.placeService.deletePlaceObservable(this.place._id);
            await this.router.navigate(['/dashboard/places']);
        }, err => {
            console.warn('unable to delete a place', err);
            this.notificationSvc.error(err.error.message);
        });
    }

    /**
     * @description opens fb post page with the above given meta data
     */
    fbShare(): void {
        // does not work in development
        const newWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${location.href}`, '_blank');
        if (window.focus) {
            newWindow.focus();
        }
    }

    /**
     * @description opens twitter post tweet page with given string in it
     */
    tweetShare(): void {
        const data = `Hey! this place  ${this.place.name} at ${this.place.address}, looks great  ${this.place.description}`;
        const newWindow = window.open(`https://twitter.com/intent/tweet?text=${data}&url=${location.href}`, '_blank');
        if (window.focus) {
            newWindow.focus();
        }
    }

    /**
     * @description opens image in new tab of given url
     * @param accepts url string
     */
    openImage(url: string): void {
        window.open(url, '_blank');
    }

}
