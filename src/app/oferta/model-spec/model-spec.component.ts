import { Component, OnInit, OnDestroy } from '@angular/core';
import { IModelSpec } from '../interfaces/i-model-spec';
import { ActivatedRoute } from '@angular/router';
import { Subject, empty } from 'rxjs';
import { tap, takeUntil, map } from 'rxjs/operators';
import { bpActiveRouteChange$ } from 'src/app/rxConst/bpActRouteChange';


@Component({
  selector: 'app-model-spec',
  templateUrl: './model-spec.component.html',
  styleUrls: ['./model-spec.component.css']
})
export class ModelSpecComponent implements OnInit, OnDestroy {
ngOnDestroy(): void {
this.isDestroyed$.next(true);
this.isDestroyed$.complete();
this.isDestroyed$.unsubscribe();
}


isDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initRoute();
    this.initData();
  }


  initRoute(){
    console.log('init..');
    this.actRoute.params.pipe(
      bpActiveRouteChange$(this.isDestroyed$)
    )
    .subscribe(
      (_data: any) => {
      console.log('model actRoute', _data);
      
      },
      (err) => console.log('model actRoute error', err),
      () => console.log('model actRoute finish..')
    )
  }


  initData(){
    
  }

}
