import {transition, group, query, animateChild, animate, style, sequence } from '@angular/animations'

export function BP_ANIM_ROUTE_TRANSITION(transitionDescription: string) {
    return transition( transitionDescription , [
            style({ position: 'fixed' }),
              query(':enter, :leave', [
                style({
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%'
                })
              ] , {optional: true}),
              query(':enter', [
                style({ left: '-100%' })
              ]),
              query(':leave', [
                animateChild()
              ], {optional: true}),
              sequence([
                query(':leave', [
                  animate('250ms ease-out', style({ left: '100%' }))
                ], {optional: true}),
                query(':enter', [
                  animate('350ms ease-in', style({ left: '0%' }))
                ]),
              ]),
              query(':enter', [
                animateChild()
              ])
            ]);
}