import { trigger, transition, query, style, stagger, animate, group } from '@angular/animations';

export function bp_anim_filter (){
    return trigger('filter', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
      query(':enter', [
        style({ opacity: 0, width: '0px', transform: 'translateX(-100%)' }),
        stagger(50, [
          group([
            animate('150ms ease-out', style({ opacity: 1 })),
            animate('300ms ease-out', style({ transform: "translateX(0)"})),
          ])
          
        ]),
      ], { optional: true })
    ]),
    transition(':decrement', [
      query(':leave', [
        stagger(50, [
          animate('250ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' })),
        ]),
      ], {optional: true})
    ]),
  ])
}