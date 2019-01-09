import { transition, animation, trigger, animate, style, group, query, stagger } from '@angular/animations';

export function BP_ANIM_ENTER_LEAVE_GROUP (enterDurationTime: number, leaveDurationTime: number) {
    return trigger('enterLeaveGroup', [
        transition(':enter', [
            query('rect,  text, line', stagger('1550ms', 
                [
                    style({opacity:0}),
                    animate(`${enterDurationTime}ms`, style({opacity: 1}))
                ]))
        ]),
        transition(':leave', [
            animate(`${leaveDurationTime}ms`, style({opacity: 0}))
        ])
    ])
    

}