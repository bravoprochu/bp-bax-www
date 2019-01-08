import { trigger, style, state, animate, transition } from '@angular/animations';

export function  BP_ANIM_SCALE_ORIGIN_OVER_LEAVE (minScale: number, maxScale: number, opacityOver:number, opacityLeave: number) {
return trigger('scaleOriginOverLeave', [
    state('over', style({transform: `scale(${maxScale})`, transformOrigin: 'initial', opacity: opacityOver})),
    state('leave', style({transform: `scale(${minScale})`, transformOrigin: '{{x}}px {{y}}px', opacity: opacityLeave}), {params: {x: 0, y: 0}}),
    // state('over', style({transform: `scale(${maxScale})`})),
    // state('leave', style({transform: `scale(${minScale})`})),
    transition('over<=>leave', [
        animate(350)
    ])
]);
}