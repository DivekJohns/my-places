import {apiUrl} from 'src/environments/environment';

export const placeApiRoutes = {
    addPlace: `${apiUrl}/add-place`,
    getPlace: `${apiUrl}/place-info/`,
    allPlaces: `${apiUrl}/places/`,
    updatePlace: `${apiUrl}/update-place/`,
    deletePlace: `${apiUrl}/delete-place/`,
    fileUpload: `${apiUrl}/upload`
};
