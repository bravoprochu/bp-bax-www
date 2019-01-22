import { query, trigger, transition, style, animate, stagger } from '@angular/animations';


export function bp_anim_SVGBorderImage () {
    return trigger('svgBorderImage', [
        transition(':enter', [
            query(':self', [
                style({opacity: 0}),
                stagger('250ms', [
                    animate('750ms', style({opacity: '*'}))
                ])
            ], {optional: false})
        ])
    ])
}