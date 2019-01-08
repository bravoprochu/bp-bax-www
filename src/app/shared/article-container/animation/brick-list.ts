import { trigger, transition, query, style, stagger, animate, group } from '@angular/animations';

export const BP_ANIM_BRICK_LIST= trigger('brickList', [
    transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translate3d(-100%, 0px, 0px)' }),
          stagger(350, [
            animate('350ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' })),
          ]),
        ], {optional:true}
        ),
    ]),
    transition(':leave', [
      group([
        query(':leave', [
          stagger(-250, [
            animate(250, style({opacity: 0, transform: 'translate3d(100%, 0px, 0px)'}))
          ]),
        ])
      ]) 
    ])
  ]
  )