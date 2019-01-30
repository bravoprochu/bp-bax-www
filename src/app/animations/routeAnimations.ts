import { animation, trigger, transition, animate, style, query, animateChild, group, useAnimation, sequence, stagger, state } from "@angular/animations";
import { fadeOutStaggerAnimation } from './fade-in-stagger';
import { BP_ANIM_OPACITY_TRANSITION_STYLE } from './bp-anim-init-style';
import { BP_ANIM_BRICK_LIST } from './bp-anim-brick-list';
//export const query = (s, a, o = {optional: true})=> q(s,a,o);


export const routeAnimation =
  trigger('routeAnimations', [
    transition('newsList => article', [
      query('*', [
        BP_ANIM_OPACITY_TRANSITION_STYLE(),
      ]),
      sequence([
        animate('350ms', BP_ANIM_OPACITY_TRANSITION_STYLE(1, '0')),
        //query('@*', animateChild())
      ])
      //query(':leave', animateChild())
    ]),

    // transition('article=>newsList', [
    //     query(':leave', [
    //       animateChild({delay: '1s'}),
    //       //animate(1400, BP_ANIM_OPACITY_TRANSITION_STYLE(0, "100%"))
    //     ]),
    //     query(':enter', [
    //       BP_ANIM_OPACITY_TRANSITION_STYLE(0.5, "-100%"),
    //       sequence([
    //         //animate(1000, BP_ANIM_OPACITY_TRANSITION_STYLE(1,"0")),
    //         animateChild()
    //       ])
    //     ]),
    // ])



    // transition('*=>*', [
    //   query(':enter, :leave', [
    //     style({ position: 'fixed', opacity:0}),
    //     //query('*', style({opacity: 0}))
    //   ], { optional: true }),
      
    //   sequence([
    //     query(':leave', [
    //       style({ opacity: 1 }),
    //       query('section', stagger(-150, [
    //         style({ transform: 'translate3d(0,0,0)' }),
    //         animate('0.5s ease-in', style({ transform: 'translate3d(100%, 0, 0)', opacity: 0 }))
    //       ]), { optional: true }
    //       ),
    //       animate('100ms', style({transform: 'translate3d(100%, 0, 0'}))
    //     ], { optional: true }),


    //     query(':enter', [
    //       style({transform: 'translate3d(-100%, 0, 0)'}),
    //       animate('200ms', style({opacity:1, transform: 'translate3d(0, 0, 0)'})),
    //       // query('section', stagger(250, [
    //       //   style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0 }),
    //       //   animate('0.25s ease-out', style({ transform: 'translate3d(0, 0, 0)', opacity: 1 }))
    //       // ]), { optional: true })
    //       animateChild()
    //     ]
    //       , { optional: true })

    //     //style({transform: 'translate3d(-100%, 0, 0)'}),
    //     // animate(200, style({transform: 'translate3d(-100%, 0, 0)', opacity:1})),
    //   ])
    // ])
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

