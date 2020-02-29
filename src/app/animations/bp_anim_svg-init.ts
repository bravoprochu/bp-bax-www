import { trigger, transition, style, animate, stagger, query, group } from '@angular/animations';
import { BP_ANIM_OPACITY_TRANSITION_STYLE } from './bp-anim-init-style';


export function BP_ANIM_SVG_INIT (opacityTime: number = 250, staggerTime: number = 250, queryString: string = 'g', delayTime: number = 0) {
    return trigger('svgInit', [
        transition(':enter', [
                query(queryString, [
                    BP_ANIM_OPACITY_TRANSITION_STYLE(0, '-100%'),
                    stagger(`${staggerTime}ms`, [
                        group([
                            animate(`${opacityTime}ms ease-in`, style({transform: 'translate3d(0, 0, 0)'})),
                            animate(`${opacityTime * 2}ms ease-in`, style({opacity: 1}))
                        ], {delay: delayTime})
                    ])
                ], {optional:true})
            ]),
        transition(':leave', [
                query(queryString, [
                    stagger(`-${staggerTime/2}ms`, [
                        animate(`${opacityTime}ms ease-out`, style({opacity: 0, transform: 'translate3d(200%,0,0)'}) ),
                        animate(`${opacityTime}ms ease-in`, style({opacity: 0}))
                    ])
                ], {optional: true})
            ]),
        ])
}
    