import { transition, group, query, animateChild, animate, style, sequence } from '@angular/animations'

export function BP_ANIM_ROUTE_TRANSITION(transitionDescription: string, delayTime: number = 0) {
  return transition(transitionDescription, [
    // style({ position: 'fixed' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: '100%'
      })
    ], { optional: false }),
    query(':leave', [
      animateChild()
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%' })
    ]),
    group([
      query(':leave', [
        animate(`250ms ease-out`, style({
          left: '100%' 
        }))
      ], { optional: true }),
      query(':enter', [
        animate(`350ms ${delayTime}ms ease-in`, style({
           left: 0, 
          }))
      ]),
    ]),
    // query(':enter', [
    //   animateChild()
    // ])
  ]);
}