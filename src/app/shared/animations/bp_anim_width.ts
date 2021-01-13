import { transition, query, style, animate, trigger, animateChild, group, sequence } from '@angular/animations';


export function bp_anim_width(enterDuration: number = 550, leaveDuration: number = 350) {
    return trigger('animWidth', [
        transition(":enter", [
            query('img', [
                style({ position: 'fixed', top: '-100%' })
            ]),
            query(":self", [
                style({
                    zIndex: 100,
                    position: 'fixed',
                    top: '-100%',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: '#0054A6',
                    height: 0,
                    opacity: 0
                })
            ]),
            query(':self',[
                sequence([
                    animate(`${enterDuration * (2/3)}ms ease-out`, style({
                        zIndex: 100,
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: '#0054A6',
                        height: '100%',
                        opacity: 1
                    })),
                    query('img', [
                        animate(`${enterDuration * (1/3)}ms ease-in`, style({ top: '*' }))
                    ], { optional: false })
                ])
            ])
        ]),




        transition(":leave", [
            query(':self', [
                style({
                    position: 'absolute',
                    zIndex: 100,
                    backgroundColor: '#0054A6',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }),
                sequence([
                    query('img', [
                        animate(`${leaveDuration* (1/3)}ms ease-in`, style({
                            top: '100%'
                        })
                        )
                    ]),
                    animate(`${leaveDuration * (2/3)}ms ease-in`, style({
                        top: '100%'
                    }))
                ])

            ])
        ])
    ])
}