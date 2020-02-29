import { trigger, transition, query, style, stagger, animate, group, animateChild, sequence } from '@angular/animations';
import { BP_ANIM_OPACITY_TRANSITION_STYLE } from './bp-anim-init-style';

export function BP_ANIM_BRICK_LIST_enter(animationTime: number = 350, staggerTime: number = 250) {
  return transition(':enter', [
    query('app-news-article-mini', [
      BP_ANIM_OPACITY_TRANSITION_STYLE(),
      stagger(staggerTime, [
        animate(`${animationTime}ms cubic-bezier(0.35, 0, 0.25, 1)`, style({ opacity: 1, transform: 'none' })),
      ]),
    ], {optional: true})
  ]);
}

export function BP_ANIM_BRICK_LIST_leave(animationTime: number = 350, staggerTime: number = 250) {
  return transition(':leave', [
    query(':leave', [
      stagger(`-${staggerTime}ms`, [
        animate(`${animationTime}ms`,
          BP_ANIM_OPACITY_TRANSITION_STYLE(1, "0"))
      ]),
    ], {optional: true})
  ])
}


export function BP_ANIM_BRICK_LIST(animationTime: number = 350, staggerTime: number = 250) {
  return trigger('brickList', [
    BP_ANIM_BRICK_LIST_enter(animationTime, staggerTime),
    // BP_ANIM_BRICK_LIST_leave(animationTime, staggerTime)
  ])
};