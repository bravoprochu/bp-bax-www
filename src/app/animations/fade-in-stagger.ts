import { animation, transition, query, style, stagger, animate, animateChild, group } from "@angular/animations";

export const fadeInStaggerAnimation = animation([
            style({opacity: 0, transform: 'translateY(-100px)'}),
            stagger(250, [
              animate('250ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none'})),
            ]),
]);

export const fadeOutStaggerAnimation = animation([
  stagger("150ms reverse" , [
    animate('{{time}} cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(-100px)' }))
  ])
]);