import { animate, state, style, transition, trigger } from '@angular/animations';

export const dialogAnimations = {
  bounceIn: trigger('bounceIn', [
    state('void', style({
      transform: 'scale(0)',
      opacity: 0,
    })),
    transition(':enter', [
      animate('300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({
        transform: 'scale(1)',
        opacity: 1,
      }))
    ]),
    transition(':leave', [
      animate('1400ms ease-out', style({
        transform: 'scale(0)',
        opacity: 0,
      }))
    ])
  ])
};
