import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { BP_ANIM_GROUP_APPEAR_ONLY } from 'src/app/animations/bp_anim_group_appear_only';
import { Subject, empty } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { bpActiveRouteChange$ } from 'src/app/rxConst/bpActRouteChange';
import { map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-model-maszyny',
  templateUrl: './model-maszyny.component.html',
  styleUrls: ['./model-maszyny.component.css'],
  animations: [
    BP_ANIM_GROUP_APPEAR_ONLY(200, 50, 'image, g')
  ]
})
export class ModelMaszynyComponent implements OnInit, OnChanges {
  @Input('model') model;
  isReady: boolean;
  isRevers: boolean;

  constructor(
    public cf: CommonFunctionsService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isReady = (<SimpleChange>changes.model).currentValue ? true : false;
  }

  onOver() {
    if (this.cf.isViewXs()) { return; }
    this.isRevers = true;
  }

  onLeave() {
    if (this.cf.isViewXs()) { return; }
    this.isRevers = false;
  }

}
