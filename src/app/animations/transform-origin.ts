import { trigger, animate, style, state, transition } from '@angular/animations';

export function BP_ANIM_TRANSFORM_ORIGIN () {
    return trigger('transformOrigin', [
        state('*', style({transformOrigin: '{{x}}px {{y}}px' }), {params: {x: 0, y: 0}}),
        transition('*<=>*', [
            animate(1)
        ])
    ])
}