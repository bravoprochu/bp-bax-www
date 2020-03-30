import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RouteAnimationService } from '../../route-animation.service';


@Injectable({
  providedIn: 'root'
})
export class ResolveAnimationIsDoneGuard implements CanActivate {
  /**
   *
   */
  constructor(private routeAnimationSrv: RouteAnimationService) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.routeAnimationSrv.isResolvingAnimationDone$;
  }



  
}
