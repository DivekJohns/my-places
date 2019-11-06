import { apiUrl } from 'src/environments/environment';

export const accountApiRoutes = {
    registerUser: `${apiUrl}/create-user`,
    loginUser: `${apiUrl}/login`,
    updateProfile: `${apiUrl}/update-user/`,
}