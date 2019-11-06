import { Injectable } from '@angular/core';
import { HttpService, Response } from 'src/app/shared/services/http/http.service';
import { placeApiRoutes } from 'src/app/modules/place/services/place-api-routes';
import {Observable, ReplaySubject} from 'rxjs';
import { Place } from '../../models/Place';

@Injectable({
  providedIn: 'root'
})
/**
 * @description place service is a simple provider which emits changes to subscribed components every function name is self explanatory
 */
export class PlaceService {
  place: Place;

  /// observable type
  places: Place[] = [];
  private $places = new ReplaySubject<Place[]>(1);

  constructor(public httpService: HttpService) {
    this.$places.next(this.places);
    this.getAllPlaces().subscribe((data: Response) => {
      if (Array.isArray(data.places)) { this.setPlacesObservable(data.places); }
    });
  }

  setPlacesObservable(places: Place[]) {
    this.places = places;
    const newPlaceInfo = [];
    places.forEach((place) => {
      const { name, _id } = place;
      newPlaceInfo.push({ name, _id });
    });
    this.$places.next(this.places);
  }


  getPlacesObservable(): Observable<Place[]> {
    return this.$places.asObservable();
  }

  updatePlaceObservable(updatedPlace: Place): void  {
    this.places = this.places.map((place): Place => {
      if (place._id === updatedPlace._id) {
        place = updatedPlace;
      }
      return place;
    });
    this.setPlacesObservable(this.places);
  }

  appendPlaceObservable(place): void  {
    this.places.push(place);
    this.setPlacesObservable(this.places);
  }

  deletePlaceObservable(placeId): void  {
    this.places = this.places.filter((place: Place) => place._id !== placeId);
    this.setPlacesObservable(this.places);
  }

  setPlaceDetails(placeDetails: Place): void {
    this.place = placeDetails;
  }

  getPlaceDetails(): Place {
    return this.place;
  }

  getPlace(id: string): Observable<Response> {
    return this.httpService.get(placeApiRoutes.getPlace + id);
  }


  addPlace(place: Place): Observable<Response> {
    return this.httpService.post(placeApiRoutes.addPlace, place);
  }

  getAllPlaces(): Observable<Response> {
    return this.httpService.get(placeApiRoutes.allPlaces + localStorage.getItem('id'));
  }

  updatePlace(place: Place, id: string): Observable<Response> {
    return this.httpService.put(placeApiRoutes.updatePlace + id, place);
  }

  deletePlace(id: string): Observable<Response> {
    return this.httpService.delete(placeApiRoutes.deletePlace + id);
  }

}
