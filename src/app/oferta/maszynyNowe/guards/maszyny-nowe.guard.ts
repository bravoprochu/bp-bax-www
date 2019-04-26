import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, observable, Subject, BehaviorSubject } from 'rxjs';
import { map, delay, tap, switchMap } from 'rxjs/operators';
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

      // return new Observable<boolean>((obs)=>{
      //   setTimeout(()=>{

      //     const model = this.mnSrv.getModelById(next.params['id']);


      //     console.log('wait..');
      //     obs.next(true);
      //     obs.complete();
      //   }, 2500)
      // });



      // return true;


    // return false;
  }
  
}
