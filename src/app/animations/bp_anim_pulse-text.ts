import { text } from '@angular/core/src/render3';
import { trigger, transition, style, animate } from '@angular/animations';

export function bp_anim_pulseText() {
    return trigger('pulseText', [
        transition(':enter', [
            style({transform: 'scale(0)', color: 'red'}),
            animate('150ms ease-in', style({transform: 'scale(1)', color: '*'}) )
        ]),
        transition(':leave', [
            animate('50ms ease-out', style({transform: 'scale(0)', color: 'red'}) )
        ])
    ])
}