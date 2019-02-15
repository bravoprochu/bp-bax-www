import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { BP_ANIM_GROUP_APPEAR_ONLY } from 'src/app/animations/bp_anim_group_appear_only';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IBaxModelSpec } from '../interfaces/i-bax-model-spec';
import { BaxMarka } from '../enums/bax-marka-enum';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';


@Component({
  selector: 'app-model-maszyny',
  templateUrl: './model-maszyny.component.html',
  styleUrls: ['./model-maszyny.component.css'],
  animations: [
    BP_ANIM_GROUP_APPEAR_ONLY(200, 50, 'image, g')
  ]
})
export class ModelMaszynyComponent implements OnInit, OnChanges, OnDestroy {
  @Input('model') model: IBaxModelSpec;
  @ViewChild('container') container: ElementRef;
  @ViewChild('bgAnim') bgAnim: ElementRef;
  bgColor: string;
  idAwers: string = this.svgCf.getUniqeId('awers');
  intersection$: IntersectionObserver;
  isData: boolean
  isImgLoaded: boolean;
  isReady: boolean;
  isRevers: boolean;

  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  this.intersection$.unobserve(this.container.nativeElement);
  this.intersection$.disconnect();
  }
  
  
  isDestroyed$: Subject<boolean> = new Subject();

  constructor(
    public cf: CommonFunctionsService,
    private svgCf: SvgCommonFunctionsService,
    private actRoute: ActivatedRoute,
  ) {  }

  ngOnInit() {
    

    //this.isReady= true;
    switch(this.model.markaId) {
      case BaxMarka.Yanmar:
      this.bgColor = environment.colorYanmar;
      break;
      
      case BaxMarka.Sennebogen:
      this.bgColor = environment.colorSennebogen
      break;

      case BaxMarka.Arjes:
      this.bgColor = environment.colorArjes
      break;

      case BaxMarka.Zemmler:
      this.bgColor = environment.colorZemler
      break;

    }
    
    this.intersection$ = new IntersectionObserver(entries => {
      entries.forEach((entry: IntersectionObserverEntry)=>{
        if(entry.intersectionRatio>0){
          this.initImage();
          // console.log('entry:', this.model.model, entry.intersectionRatio, entry);
          this.intersection$.disconnect();
        }
      })
    }, {threshold: [0, 0.25, 0.5, 0.75, 1]});

    this.intersection$.observe(this.container.nativeElement);

    

  }


  ngOnChanges(changes: SimpleChanges) {
    this.isData = (<SimpleChange>changes.model).currentValue ? true : false;
  }

  initImage():void {
    if(this.isData && !this.isImgLoaded) {
      const img = new Image();
      img.setAttribute("src", this.model.mediaCardImg);
      img.onload= (ev)=>{
        const i = (<HTMLImageElement>ev.target);
        // console.log(`fotka wczytana, ${i.naturalWidth}x${i.naturalHeight}`);
        this.isImgLoaded = true;
        this.isReady= true;
      }
    }
  }

  onClick() {
    this.isRevers = !this.isRevers;
    // if(this.cf.isViewXs()){
    //   this.isRevers = !this.isRevers;
    // }
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
