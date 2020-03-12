import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, OnDestroy, Sanitizer, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import {MediaMatcher, BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { takeUntil} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject, fromEvent, of, merge } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IOfertaItem } from './i-oferta-item';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';
import { CardPersonService } from 'src/app/common/card-person/card-person.service';
import { ThrowStmt } from '@angular/compiler';
import { BAX_BRANDS } from 'src/app/common/enums/bax-brands.enum';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST()
  ],
})
export class OfertaComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   *
   */
  constructor(
    private sanitize: DomSanitizer,
    private el: ElementRef,
    private viewportRuler: ViewportRuler,
    private breakpointObs: BreakpointObserver,
    private mediaM: MediaMatcher,
    private svgCF: SvgCommonFunctionsService,
    private cardPersonCF: CardPersonService
    ){}



  cssOfertaItemContainer: string;
  cssOfertaItemContainerBody: string;


  productItems: string[] = ['sennebogen', 'arjes', 'guidetti', 'yanmar'];


  idx: number = 0;
  items = Array.from({length: 1000}).map((_, i) => `Item #${i}`);
  isDestroyed$: Subject<boolean> = new Subject();
  
  isPortrait: boolean;
  isSmall: boolean;
  
  itemSize: number = 500;
  logoBax: string;

  ofertaItems: IOfertaItem[];

  
  
  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  }

  ngOnInit() {
    this.ofertaItems = [
      {
        brandColor: this.cardPersonCF.getBrandHashColor(BAX_BRANDS.BAX),
        footerImgSrc: '../../../assets/oferta/1x1/bax_ofertaItem_katalogMaszyn.png',
        headerImgSrc: '../../../assets/svg/logotypy/logo_bax.svg',
        markaCss: 'bax-gradient',
        subtitle: 'Nowe maszyny Sennebogen, Yanmar',
        routerLink: 'maszynyNowe',
        title: 'Katalog maszyn'
      },
      {
        brandColor: this.cardPersonCF.getBrandHashColor(BAX_BRANDS.Sennebogen),
        footerImgSrc: '../../../assets/oferta/1x1/sennebogen/sennebogen 835 E mobile 04.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_sennebogen.svg',
        markaCss: 'sennebogen-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'sennebogen',
        title: 'marka'
      },
      {
        brandColor: this.cardPersonCF.getBrandHashColor(BAX_BRANDS.Yanmar),
        footerImgSrc: '../../../assets/oferta/1x1/yanmar/SV60_C_082_8x9.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_yanmar.svg',
        markaCss: 'yanmar-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'yanmar',
        title: 'marka'
      },
      {
        brandColor: this.cardPersonCF.getBrandHashColor(BAX_BRANDS.Arjes),
        footerImgSrc: '../../../assets/oferta/1x1/arjes/impaktor_250_evo_bauschutt_01-1024x768.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_arjes.svg',
        markaCss: 'arjes-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'arjes',
        title: 'marka'
      },
      {
        brandColor: this.cardPersonCF.getBrandHashColor(BAX_BRANDS.Guidetti),
        footerImgSrc: '../../../assets/oferta/1x1/guidetti/IMG_20190930_111008.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_guidetti.svg',
        markaCss: 'guidetti-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'guidetti',
        title: 'marka'
      },
      {
        brandColor: this.cardPersonCF.getBrandHashColor(BAX_BRANDS.BAX),
        footerImgSrc: '../../../assets/oferta/1x1/bax_ofertaItem_regeneracja.png',
        headerImgSrc: '../../../assets/svg/logotypy/logo_bax.svg',
        markaCss: 'bax-gradient',
        subtitle: 'Zakres usług serwisowych',
        routerLink: 'serwis',
        title: 'serwis'
      },
      {
        brandColor: this.cardPersonCF.getBrandHashColor(BAX_BRANDS.BAX),
        footerImgSrc: '../../../assets/oferta/1x1/bax_ofertaItem_czesci.png',
        headerImgSrc: '../../../assets/svg/logotypy/logo_bax.svg',
        markaCss: 'bax-gradient',
        subtitle: 'Części do maszyn',
        routerLink: 'czesci',
        title: 'części'
      },     
    ];

    const _LANDSCAPE = [Breakpoints.HandsetLandscape, Breakpoints.TabletLandscape, Breakpoints.WebLandscape];
    const _PORTRAIT = [Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait, Breakpoints.WebPortrait];
    // const _SMALL = [Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.];
    const _SMALL = [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset, Breakpoints.Tablet];
    const _REST = [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge];


    this.breakpointObs.observe([..._REST,..._LANDSCAPE, ..._PORTRAIT]).pipe(
      takeUntil(this.isDestroyed$)
    )
    .subscribe(
         (_breakpObs:any)=>{
              this.cssOfertaItemContainer = 'oferta-item-container-small';
              
              this.isSmall = this.breakpointObs.isMatched(_SMALL);

              if(this.breakpointObs.isMatched(_SMALL)) {
                  console.log('isSmall...');

                this.cssOfertaItemContainerBody = this.breakpointObs.isMatched(_PORTRAIT) ? 'oferta-item-container-body-portrait' : 'oferta-item-container-body-landscape'  
              } else {
                console.log('is NOT Small...');


                this.cssOfertaItemContainerBody = 'oferta-item-container-body-portrait';
                this.cssOfertaItemContainer = 'oferta-item-container-big';
              }
              
         },
         (error)=>console.log('_breakpObs error', error),
         ()=>console.log('_breakpObs completed..')
    );



    this.initData();


  }

  ngAfterViewInit(): void {

  }

  addIdx() {
    this.idx = this.idx < this.productItems.length-1 ? this.idx+1 : this.productItems.length-1;
  }




  removeIdx() {
    this.idx = this.idx <1 ? 0 : this.idx = this.idx-1;
    console.log('removeIdx', this.idx);
  }


  minHeight:number; 
  title = 'bax';
  staggerDelay: number = 200;
  isClicked: boolean = true;
  playerVars:{} = {
    
  }


  // initYoutube(){
  //   const tag = document.createElement('script');
  //   tag.src = "https://www.youtube.com/iframe_api";
  //   document.body.appendChild(tag);
  // }

  initData() {
  

  }

  getGridArea(i:number):SafeStyle {
    return this.sanitize.bypassSecurityTrustStyle(`${i+1} / 1 / ${i+2} / 2`);
  }




}
