import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { bpActiveRouteChange$ } from 'src/app/rxConst/bpActRouteChange';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { OfertaService } from '../../oferta.service';
import { MaszynyNoweService } from '../maszyny-nowe.service';


@Component({
  selector: 'app-model-spec',
  templateUrl: './model-spec.component.html',
  styleUrls: ['./model-spec.component.css']
})
export class ModelSpecComponent implements OnInit, OnDestroy {
  isReady: boolean;
  model: IBaxModelMaszynaNowa;


ngOnDestroy(): void {
this.isDestroyed$.next(true);
this.isDestroyed$.complete();
this.isDestroyed$.unsubscribe();
}

isDestroyed$: Subject<boolean> = new Subject();


constructor(
    private actRoute: ActivatedRoute,
    private mnSrv: MaszynyNoweService
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
      this.model =  this.mnSrv.getModelList().find(f=>f.id == _modelId);
      console.log(this.model);
      this.isReady = true;
      },
    )
  }


  initData(){
    
  }

}
