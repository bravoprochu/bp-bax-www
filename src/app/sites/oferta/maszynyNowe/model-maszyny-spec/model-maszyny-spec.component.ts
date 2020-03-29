import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, throttleTime, debounceTime } from 'rxjs/operators';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { IBaxModelSpecGroup } from '../../interfaces/i-bax-model-spec-group';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';



@Component({
  selector: 'app-model-maszyny-spec',
  templateUrl: './model-maszyny-spec.component.html',
  styleUrls: ['./model-maszyny-spec.component.css']
})
export class ModelMaszynySpecComponent implements OnInit {
  @Input('model') model: IBaxModelMaszynaNowa
  isDestroyed$: Subject<boolean> = new Subject();
  modelPropGroups: IBaxModelSpecGroup[]=[];
  search$: FormControl = new FormControl();

  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  }
  
  
  

  constructor(
    private mnSrv: MaszynyNoweService,
  ) { }

  ngOnInit() {
    this.modelPropGroups = this.mnSrv.getModelLineGroup(this.model, null);
    this.initSearch$();   
  }



  initSearch$(){
    this.search$.valueChanges.pipe(
      takeUntil(this.isDestroyed$),
      debounceTime(750),
      distinctUntilChanged(),
      )
      .subscribe(
        (_data: any) => {
          this.modelPropGroups = this.mnSrv.getModelLineGroup(this.model, (<string>_data).length>0 ? _data : null);
        },
        (err) => console.log('modelMaszynySpec error', err),
      )
  }

}
