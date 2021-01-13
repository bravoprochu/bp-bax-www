import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';

@Injectable({
  providedIn: 'root'
})
export class MaszynyNoweGuard implements CanActivate {
  /**
   *
   */
  constructor(private mnSrv: MaszynyNoweService) {
    
    
  }
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log('whaaa ?');
      console.log(next.params.id);
      console.log(state.url);


      const id = next.params['id'];

      return this.mnSrv.getModelById(id).pipe(
        delay(2000),
        map((model: IBaxModelMaszynaNowa)=>{
          console.log('model..:', model);
          return model? true: false;
        }
      ))
  }
  
}
