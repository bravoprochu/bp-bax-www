import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { BP_ANIM_GROUP_APPEAR_ONLY } from 'src/app/animations/bp_anim_group_appear_only';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { BaxMarka } from '../../enums/bax-marka-enum';
import { takeUntil } from 'rxjs/operators';
import { MaszynyNoweService } from '../maszyny-nowe.service';
import { bp_anim_appearUpDown } from 'src/app/animations/bp_anim_appear-up-down';


@Component({
  selector: 'app-model-maszyny',
  templateUrl: './model-maszyny.component.html',
  styleUrls: ['./model-maszyny.component.css'],
  animations: [
    BP_ANIM_GROUP_APPEAR_ONLY(200, 50, 'image, g'),
    bp_anim_appearUpDown()
  ]
})
export class ModelMaszynyComponent implements OnInit, OnChanges, OnDestroy {
  @Input('model') model: IBaxModelMaszynaNowa;
  @ViewChild('container') container: ElementRef;
  @ViewChild('bgAnim') bgAnim: ElementRef;
  bgColor: string;
  idAwers: string = this.svgCf.getUniqeId('awers');
  intersection$: IntersectionObserver;
  isCardInfo: boolean;
  isData: boolean
  isImgLoaded: boolean;
  isReady: boolean;
  isRevers: boolean;
  logoMarka: string;
  markaGradient: string;
  preloaderHeight: number = 405;
  preloaderViewBox: string = "0 0 720 405";

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
    public mnSrv: MaszynyNoweService
  ) {  }

  ngOnInit() {
    this.markaGradient = this.cf.getUniqueId('markaGradient');
    this.mnSrv.isModelSpecCardInfo.valueChanges.pipe(
      takeUntil(this.isDestroyed$),
    )
    .subscribe(
      (isSpecCardInfo: boolean) => {
      this.preloaderHeight = isSpecCardInfo ? 1280 : 405;
      this.preloaderViewBox = `0 0 720 ${this.preloaderHeight}`;
      },
    )
    
   
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
