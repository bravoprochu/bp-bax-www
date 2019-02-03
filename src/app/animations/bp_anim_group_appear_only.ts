import { transition, trigger, query, stagger, group, animate, style } from '@angular/animations';


export function BP_ANIM_GROUP_APPEAR_ONLY_enter (opacityTime: number = 250, staggerTime: number = 250, queryString: string = 'g', delayTime: number = 0)  {
    return transition(':enter', [
        query(queryString, [
            style({opacity: 0}),
            stagger(`${staggerTime}ms`, [
                group([
                    animate(`${opacityTime * 2}ms ease-in`, style({ opacity: 1 }))
                ], { delay: delayTime })
            ])
        ], { optional: true })
    ])
}


export function BP_ANIM_GROUP_APPEAR_ONLY_leave  (opacityTime: number = 250, staggerTime: number = 250, queryString: string = 'g', delayTime: number = 0)  {
    return transition(':leave', [
        query(queryString, [
            stagger(`-${staggerTime / 2}ms`, [
                animate(`${opacityTime}ms ease-out`, style({ opacity: 0}))
            ])
        ], { optional: true })
    ])
}



export function BP_ANIM_GROUP_APPEAR_ONLY (opacityTime: number = 250, staggerTime: number = 250, queryString: string = 'g', delayTime: number = 0) {
    return trigger('groupAppear', [
        BP_ANIM_GROUP_APPEAR_ONLY_enter(opacityTime, staggerTime, queryString, delayTime),
        BP_ANIM_GROUP_APPEAR_ONLY_leave(opacityTime, staggerTime, queryString, delayTime)
    ]
    )
}