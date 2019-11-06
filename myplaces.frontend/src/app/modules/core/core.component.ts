import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {Place} from '../../shared/models/Place';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '', title: 'Dashboard', icon: 'dashboard' },
    { path: 'settings', title: 'Settings', icon: 'settings' }
];


@Component({
    selector: 'app-dashboard',
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.scss'],
})

export class CoreComponent implements OnInit {
    appName = 'my places';
    menuItems: any[];
    places: Place[];
    mobileQuery: MediaQueryList;
    loading = false;
    userImg = 'https://image.flaticon.com/icons/svg/149/149452.svg';
    name: string;
    mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef,
                media: MediaMatcher, private router: Router, public userService: UserService) {
        /**
         * @description get user observable and sets user to maintain state
         */
        userService.getUser().subscribe(data => {
            this.userImg = data.image;
            this.name = data.name;
        });
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
        // @todo deprecated :(
        this.mobileQuery.addListener(this.mobileQueryListener);
        /**
         * @description subscribes to router event for loading bar animation
         */
        this.router.events.subscribe((event: any) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }


    ngOnInit(): void {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    /**
     * @description Sign out user
     */
    signOut(): void {
        localStorage.clear();
        location.reload();
    }
    /**
     * @description Invite a user to my website link
     */
    invite(): void {
        window.open('http://divek.rf.gd');
    }
    /**
     * @description closes sidenav and redirects to given path
     * @param accepts sideNav object and path string
     */
    close(sideNav: any, path: string) {
        sideNav.toggle();
        setTimeout(() => this.router.navigate(['/dashboard/' + path]), 300);
    }
}
