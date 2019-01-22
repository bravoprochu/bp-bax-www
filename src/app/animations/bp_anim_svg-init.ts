import { trigger, transition, style, animate, stagger, query, group } from '@angular/animations';


export function bp_anim_svg_init () {
    return trigger('svgInit', [
        transition(':enter', [
                query('g', [
                    style({opacity: 0, transform: 'translateX(-100%)'}),
                    stagger('250ms', [
                        group([
                            animate('250ms ease-in', style({transform: 'translateX(0)'})),
                            animate('750ms ease-in', style({opacity: 1}))
                        ])
                    ])
                ], {optional:true})
            ]),
        transition(':leave', [
                query('g', [
                    style({opacity: 0}),
                    stagger('-250ms', [
                        animate('750ms ease-in', style({opacity: 1}) )
                    ])
                ], {optional: true})
            ]),
        ])
}
    