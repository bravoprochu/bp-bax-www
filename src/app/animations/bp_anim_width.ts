import { transition, query, style, animate, trigger } from '@angular/animations';

export function bp_anim_width() {
    return trigger('animWidth', [
        transition(":enter", [
            query(":self", [
                style({
                    zIndex: 100,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 0,
                    backgroundColor: '#0054A6',
                    opacity: 0
                }),
                animate('0.55s ease-out', style({
                    zIndex: 100,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '100%',
                    backgroundColor: '#0054A6',
                    opacity: 1
                }))
            ])
        ]),


        transition(":leave", [
            query(':self', [
            style({
                zIndex: 100,
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: '100%',
                backgroundColor: 'yellow',
                opacity: 1

            }),
            animate('0.25s ease-in', style({
                zIndex: 100,
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: 0,
                backgroundColor: 'yellow',
                opacity: 0.2
            }))
            ])
        ])
    ])
}