import { style } from '@angular/animations';

export function BP_ANIM_OPACITY_TRANSITION_STYLE (opacity: number = 0, posX: string = "100%", posY: string = "0px", posZ: string = "0px") {
    return style({ opacity: 0, transform: `translate3d(${posX}, ${posY}, ${posZ})`});
}