import { animation, trigger, transition, animate, style, query, animateChild, group, useAnimation, sequence, stagger, state } from "@angular/animations";
import { BP_ANIM_ROUTE_TRANSITION } from './bp_anim_route_transition';
//export const query = (s, a, o = {optional: true})=> q(s,a,o);


export const routeAnimation =
  trigger('routeAnimations', [
    // transition('newsList => article', [
    //   query('*', [
    //     BP_ANIM_OPACITY_TRANSITION_STYLE(),
    //   ]),
    //   sequence([
    //     animate('350ms', BP_ANIM_OPACITY_TRANSITION_STYLE(1, '0')),
    //     //query('@*', animateChild())
    //   ])
    //   //query(':leave', animateChild())
    // ]),
    BP_ANIM_ROUTE_TRANSITION('* => contact'),
    BP_ANIM_ROUTE_TRANSITION('* => maszynyNowe'),
     
    BP_ANIM_ROUTE_TRANSITION('* => newsList'),
    BP_ANIM_ROUTE_TRANSITION('* => info'),
    
  ]);
    // transition('oferta <=> *', [
    //   style({ position: 'relative' }),
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       width: '100%'
    //     })
    //   ]),
    //   query(':enter', [
    //     style({ left: '-100%'})
    //   ]),
    //   query(':leave', animateChild()),
    //   group([
    //     query(':leave', [
    //       animate('300ms ease-out', style({ left: '100%'}))
    //     ], {optional:true}),
    //     query(':enter', [
    //       animate('300ms ease-out', style({ left: '0%'}))
    //     ]),

    //   ]),
    //   query(':enter', animateChild()),
    // ]),

    // transition('home=>oferta', [
    //   query(':enter', [
    //     style({ left: '-100%'})
    //   ]),
    //   query(':leave', animateChild()),
    //   group([
    //     query(':leave', [
    //       animate('300ms ease-out', style({ left: '100%'}))
    //     ]),
    //     query(':enter', [
    //       animate('300ms ease-out', style({ left: '0%'}))
    //     ])
    //   ]),
    //   query(':enter', animateChild()),
    // ])




    // transition('oferta => *', [
    //   style({ position: 'relative' }),
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       width: '100%'
    //     })
    //   ], {optional: true}),
    //   query(':enter', [
    //     style({ left: '-100%'})
    //   ]),
    //   query(':leave', animateChild(), {optional: true}),
    //   group([
    //     query(':leave', [
    //       sequence([
    //         query('app-article-container', [
    //           useAnimation(fadeOutStaggerAnimation, {
    //             params: {
    //               time: '350ms'
    //             }
    //           }),
    //         ], {optional:true}),
    //         animate('100ms ease-out', style({ left: '100%'}))
    //       ])
    //     ]),
    //     query(':enter', [
    //       animate('300ms ease-out', style({ left: '0%'}))
    //     ])
    //   ]),
    //   query(':enter', animateChild()),
    // ]),



    //   transition('* <=> yanmar', [
    //     style({ position: 'relative' }),
    //     query(':enter, :leave', [
    //       style({
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         width: '100%'
    //       })
    //     ]),
    //     query(':enter', [
    //       style({ left: '-100%'})
    //     ]),
    //     query(':leave', animateChild()),
    //     group([
    //       query(':leave', [
    //         animate('200ms ease-out', style({ left: '100%'}))
    //       ]),
    //       query(':enter', [
    //         animate('300ms ease-out', style({ left: '0%'}))
    //       ])
    //     ]),
    //     query(':enter', animateChild()),
    //   ])

