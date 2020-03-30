import {query, trigger, style, transition, animate } from '@angular/animations';


export function BP_ANIM_ENTER_LEAVE_FROM_SIDE (enterTime: number, leaveTime: number) {
    return trigger('bpAnimEnterLeaveFromSide', [
        transition(':enter', [
            style({ position: 'fixed', right: '-100%'}),
            animate(`${enterTime}ms`, style({right: '*'}))
        ]), 
        transition(':leave', [
            animate(`${enterTime}ms`, style({right: '-100%', position: 'fixed'}))
        ]), 
        
    ])
}