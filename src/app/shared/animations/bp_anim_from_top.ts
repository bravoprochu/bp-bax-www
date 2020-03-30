import { transition, trigger, style, animate } from '@angular/animations';



export function BP_ANIM_FROM_TOP(animInDuration: number, animOutDuration: number ){
    return trigger('animFromTop', [
        transition(':enter', [
            style({position: 'fixed', top: '-100%'}),
            animate(`${animInDuration}ms`, style({top: '*'}))
        ]),
        transition(':leave', [
            animate(`${animOutDuration}ms`, style({position: 'absolute', bottom: '100%'}))
        ])
    ])
}