import { transition, trigger, query, stagger, group, animate, style } from '@angular/animations';
import { BP_ANIM_OPACITY_TRANSITION_STYLE } from './bp-anim-init-style';

export function BP_ANIM_GROUP_APPEARING_enter (opacityTime: number = 250, staggerTime: number = 250, queryString: string = 'g', delayTime: number = 0)  {
    return transition(':enter', [
        query(queryString, [
            BP_ANIM_OPACITY_TRANSITION_STYLE(0, '-100%'),
            stagger(`${staggerTime}ms`, [
                group([
                    animate(`${opacityTime}ms ease-in`, style({ transform: 'translate3d(0, 0, 0)' })),
                    animate(`${opacityTime * 2}ms ease-in`, style({ opacity: 1 }))
                ], { delay: delayTime })
            ])
        ], { optional: true })
    ])
}


export function BP_ANIM_GROUP_APPEARING_leave  (opacityTime: number = 250, staggerTime: number = 250, queryString: string = 'g', delayTime: number = 0)  {
    return transition(':leave', [
        query(queryString, [
            stagger(`-${staggerTime / 2}ms`, [
                animate(`${opacityTime}ms ease-out`, style({ opacity: 0, transform: 'translateX(-100%)' }))
            ])
        ], { optional: true })
    ])
}



export function BP_ANIM_GROUP_APPEARING (opacityTime: number = 250, staggerTime: number = 250, queryString: string = 'g', delayTime: number = 0) {
    return trigger('groupAppearing', [
        BP_ANIM_GROUP_APPEARING_enter(opacityTime, staggerTime, queryString, delayTime),
        BP_ANIM_GROUP_APPEARING_leave(opacityTime, staggerTime, queryString, delayTime)
    ]
    )
}