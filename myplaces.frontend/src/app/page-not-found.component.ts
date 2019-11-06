import {Component} from '@angular/core';

@Component({
    template: '<div class="container animate-fading" routerLink="../"> <h1> Page not found 404 </h1></div>',
    styles: [`
        .container {
            display: flex;
            height: 100vh;
            justify-content: center;
            color: orangered;
            background: url("https://www.pcsteps.com/wp-content/uploads/2018/04/The_Most_Intresting_404_ERROR_Pages_Around_The_Web_020.png");
            background-repeat: no-repeat;
            background-position: center;
        }

        .animate-fading {
            animation: fading 10s infinite
        }

        @keyframes fading {
            0% {
                opacity: 0
            }
            50% {
                opacity: 1
            }
            100% {
                opacity: 0
            }
        }

    `]
})
export class PageNotFoundComponent {
}