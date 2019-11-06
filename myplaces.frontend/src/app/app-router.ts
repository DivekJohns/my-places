import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuardService } from './shared/services/guards/auth-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: './modules/startup/startup.module#StartupModule',
        data: { animation: 'contacts' }
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        loadChildren: './modules/core/core.module#CoreModule',
        data: { animation: 'core' }
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];
