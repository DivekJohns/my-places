import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

const routeAnimationsNames = [
    'settings',
    'startup',
    'details'];

const animations = routeAnimationsNames.map((eachAnimations) => {
    return transition(`* <=> ${eachAnimations}`, [
        style({position: 'relative'}),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [
            style({opacity: '0', transform: 'translateX(-100%)'})
        ]),
        query(':leave', animateChild(), {optional: true}),
        group([
            query(':leave', [
                animate('200ms ease-in-out', style({opacity: '0', transform: 'translateX(100%)'}))
            ], {optional: true}),
            query(':enter', [
                animate('400ms ease-in-out', style({opacity: '1', transform: 'translateX(0)'}))
            ])
        ]),
        query(':enter', animateChild()),
    ]);
});
export const slideInAnimation = trigger('routeAnimations', animations);
