import { trigger, transition, query, style, stagger, animate, group, animateChild, sequence } from '@angular/animations';


export const BP_ANIM_BRICK_LIST = trigger('brickList', [
  transition(':enter', [
      query(':enter', [
        style({ opacity: 0, transform: 'translate3d(-100%, 0px, 0px)' }),
        stagger(350, [
          animate('350ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' })),
      ]),
    ])
  ]),
  transition(':leave', [
    query(':leave', [
      stagger(-250, [
        animate(250, style({ opacity: 0, transform: 'translate3d(100%, 0px, 0px)' }))
      ]),
    ])
  ]),
  transition(':increment', [
    query(':enter', [
      style({opacity: 0}),
      stagger(50, [
        animate('300ms ease-out', style({opacity: 1}))
      ])
    ])
  ]),
  transition(':decrement', [
    query(':leave', [
      stagger('50ms', [
        animate('150ms', style({opacity: 0}))
      ])
    ])
  ])
]
)