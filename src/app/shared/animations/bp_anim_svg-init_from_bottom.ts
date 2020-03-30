import { trigger, transition, style, animate, stagger, query, group } from '@angular/animations';


export function bp_anim_svg_init_fromBottom (opacityTime: number = 250, staggerTime: number = 250) {
    return trigger('svgInitFromBottom', [
        transition(':enter', [
                query('g', [
                    style({opacity: 0, transform: 'translateY(-100%)'}),
                    stagger(`${staggerTime}ms`, [
                        group([
                            animate(`${opacityTime}ms ease-in`, style({transform: 'translateY(0)'})),
                            animate(`${opacityTime * 2}ms ease-in`, style({opacity: 1}))
                        ])
                    ])
                ], {optional:true})
            ]),
        transition(':leave', [
                query('g', [
                    stagger(`-${staggerTime/2}ms`, [
                        animate(`${opacityTime/2}ms ease-out`, style({opacity: 0, transform: 'translateY(-100%)'}) )
                    ])
                ], {optional: true})
            ]),
        ])
}
    