import { trigger } from "@angular/animations";
import { BP_ANIM_ROUTE_TRANSITION } from './bp_anim_route_transition';

export const routeAnimation =
  trigger('routeAnimations', [
    BP_ANIM_ROUTE_TRANSITION('* => contact'),
    BP_ANIM_ROUTE_TRANSITION('* => maszynyNoweList', 500),
    BP_ANIM_ROUTE_TRANSITION('* => maszynyNowe', 500),
     
    BP_ANIM_ROUTE_TRANSITION('* => newsList', 500),
    BP_ANIM_ROUTE_TRANSITION('* => info'),
    
  ]);