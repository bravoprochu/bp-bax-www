import { trigger, transition, style, animate } from '@angular/animations';
import { query } from '@angular/core/src/render3';

export function BP_ANIM_OPACITY_INIT (animationTime: number = 500, delayTime:number = 0) {
    return trigger('opacityInit', [
        transition(':enter', [
            style({opacity: 0}),
            animate(`${animationTime}ms ${delayTime}ms ease-out`, style({opacity: '*'}))
        ]),
         transition(':leave', [
             animate(`${animationTime/2}ms`, style({opacity: 0}))
         ])
    ])
}