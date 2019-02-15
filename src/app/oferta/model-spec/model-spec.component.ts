import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { bpActiveRouteChange$ } from 'src/app/rxConst/bpActRouteChange';
import { OfertaService } from '../oferta.service';
import { IBaxModelSpec } from '../interfaces/i-bax-model-spec';


@Component({
  selector: 'app-model-spec',
  templateUrl: './model-spec.component.html',
  styleUrls: ['./model-spec.component.css']
})
export class ModelSpecComponent implements OnInit, OnDestroy {
  isReady: boolean;
  model: IBaxModelSpec;


ngOnDestroy(): void {
this.isDestroyed$.next(true);
this.isDestroyed$.complete();
this.isDestroyed$.unsubscribe();
}


isDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private actRoute: ActivatedRoute,
    private ofertaSrv: OfertaService
  ) { }

  ngOnInit() {
    this.initRoute();
    this.initData();
  }


  initRoute(){
    this.actRoute.params.pipe(
      bpActiveRouteChange$(this.isDestroyed$)
    )
    .subscribe(
      (_modelId: any) => {
      console.log('model actRoute: ', _modelId);
      console.log(this.ofertaSrv.getModelList())

      this.model =  this.ofertaSrv.getModelList().find(f=>f.id == _modelId);
      console.log(this.model);
      this.isReady = true;

      
      },
      (err) => console.log('model actRoute error', err),
      () => console.log('model actRoute finish..')
    )
  }


  initData(){
    
  }

}
