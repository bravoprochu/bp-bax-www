import { trigger, transition, animate, style, state } from '@angular/animations';

export function BP_ANIM_OPACITY_OVER_LEAVE (minOpacity: number, maxOpacit:number) {
    return trigger('opacityOverLeave', [
        state('over', style({opacity: maxOpacit})),
        state('leave', style({opacity: minOpacity})),
        transition('over<=>leave', [
            animate(500)
        ])
    ]);
}
