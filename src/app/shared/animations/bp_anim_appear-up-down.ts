import { trigger, transition, state, animate, style } from '@angular/animations';

export function bp_anim_appearUpDown(animTime: number = 250) {
    return trigger('apearUpDown', [
        transition(':enter', [
            style({transform: 'scaleY(0)', transformOrigin: 'top', opacity: 0}),
            animate(`${animTime}ms ease-in`, style({transform: 'scaleY(1)', opacity: 1}))
        ]),
        transition(':leave', [
            animate(`${animTime*(4/5)}ms ease-out`, style({transform: 'scaleY(0)', opacity: 0}))
        ])
    ])
}