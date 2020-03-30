import { query, trigger, transition, style, animate, stagger, group } from '@angular/animations';


export function bp_anim_SVGBorderImage (animationTime:number = 750, staggerTime: number = 200, delayTime:number = 0) {
    return trigger('svgBorderImage', [
        transition(':enter', [
            query('rect', [
                style({opacity: 0}),
                stagger(`-${staggerTime}ms`, [
                    group([
                        animate(`${animationTime}ms`, style({opacity: '*'}))
                    ], {delay: delayTime})
                    
                ])
            ], {optional: false})
        ])
    ])
}