import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, OnDestroy, Sanitizer, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import {MediaMatcher, BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { CdkVirtualScrollViewport, ViewportRuler } from '@angular/cdk/scrolling';
import { takeUntil, map, timeout, tap, delay, switchMap, startWith, take, takeWhile, repeat, mergeAll} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject, fromEvent, of, merge } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IOfertaItem } from './i-oferta-item';
import { BREAKPOINT } from '@angular/flex-layout';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST()
  ],
})
export class OfertaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewPort: CdkVirtualScrollViewport;
  /**
   *
   */
  constructor(
    private cf: CommonFunctionsService,
    private ngZone: NgZone,
    private router: Router,
    private sanitize: DomSanitizer,
    private el: ElementRef,
    private viewportRuler: ViewportRuler,
    private breakpointObs: BreakpointObserver,
    private mediaM: MediaMatcher
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
  ofertaItems: IOfertaItem[];

  
  
  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  }

  ngOnInit() {

    this.ofertaItems = [
      {
        footerImgSrc: '../../../assets/oferta/1x1/bax_ofertaItem_katalogMaszyn.png',
        headerImgSrc: '../../../assets/svg/logotypy/logo_bax.svg',
        markaCss: 'bax-gradient',
        subtitle: 'Nowe maszyny Sennebogen, Yanmar',
        routerLink: 'maszynyNowe',
        title: 'Katalog maszyn'
      },
      {
        footerImgSrc: '../../../assets/oferta/1x1/sennebogen 835 E mobile 04.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_sennebogen.svg',
        markaCss: 'sennebogen-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'sennebogen',
        title: 'marka'
      },
      {
        footerImgSrc: '../../../assets/oferta/1x1/SV60_C_082_8x9.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_yanmar.svg',
        markaCss: 'yanmar-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'yanmar',
        title: 'marka'
      },
      {
        footerImgSrc: '../../../assets/oferta/1x1/impaktor_250_evo_bauschutt_01-1024x768.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_arjes.svg',
        markaCss: 'arjes-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'arjes',
        title: 'marka'
      },
      {
        footerImgSrc: '../../../assets/oferta/1x1/IMG_20190930_111008.JPG',
        headerImgSrc: '../../../assets/svg/logotypy/logo_guidetti.svg',
        markaCss: 'guidetti-gradient',
        subtitle: 'Autoryzowany dealer marki',
        routerLink: 'guidetti',
        title: 'marka'
      },
      {
        footerImgSrc: '../../../assets/oferta/1x1/bax_ofertaItem_regeneracja.png',
        headerImgSrc: '../../../assets/svg/logotypy/logo_bax.svg',
        markaCss: 'bax-gradient',
        subtitle: 'Zakres usług serwisowych',
        routerLink: 'serwis',
        title: 'serwis'
      },
      {
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
    const _SMALL = [Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape];



    this.breakpointObs.observe([..._PORTRAIT, ..._LANDSCAPE]).pipe(
      takeUntil(this.isDestroyed$)
    )
    .subscribe(
         (_breakpObs:any)=>{
              this.cssOfertaItemContainer = 'oferta-item-container-small';
              
              this.isSmall = this.breakpointObs.isMatched(_SMALL);

              if(this.breakpointObs.isMatched(_SMALL)) {
                this.cssOfertaItemContainerBody = this.breakpointObs.isMatched(_PORTRAIT) ? 'oferta-item-container-body-portrait' : 'oferta-item-container-body-landscape'  
              } else {
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
    // this.minHeight = window.innerHeight - this.cf.navHeight;
    // console.log('minHeight', this.minHeight);

    // this.viewPort.elementScrolled().pipe(
    //   takeUntil(this.isDestroyed$)
    //   )
    //   .subscribe(
    //     (v)=>{
    //       let _el = (<HTMLElement>v.srcElement);
    //       console.log('event: ', v, _el.clientHeight, this.viewPort._totalContentHeight);

    //       console.log(this.viewPort.getElementRef);
          
    //       this.viewPort.scrollToIndex(_el.scrollHeight + _el.clientHeight, 'smooth');
    //       this.viewPort._totalContentHeight
    //       console.log('elScrolled', v);
    //       console.log(this.viewPort.measureScrollOffset(), this.viewPort.getRenderedRange(), 'scrollOffset: ', this.viewPort.getOffsetToRenderedContentStart());
    //     }
    //   )


    //   fromEvent(<HTMLElement>this.viewPort.getElementRef().nativeElement, "mousewheel").pipe(
    //     takeUntil(this.isDestroyed$),
    //     map((ev:WheelEvent) => {
    //       this.idx = ev.deltaY>0 ? this.idx+1 : this.idx-1;
    //       return ev;
    //       })

    // )
    //     .subscribe(
    //          (ev:any)=>{

    //             let h = window.innerHeight;
    //             console.log(h);
    //             this.itemSize = h;
    //             const _div:HTMLElement = <HTMLElement>(this.viewPort.getElementRef().nativeElement);

    //             console.log('div',_div, _div);
                

                
    //               // console.log('ev subs:', ev, this.idx);

    //               const d = this.viewPort.getRenderedRange();

    //               this.viewPort.scrollToIndex(10);

    //               // console.log(`offset: ${d}`, d);
                  
    //               //  this.viewPort.scrollToIndex(this.idx);
                  
    //          },
    //          (error)=>console.log('ev error', error),
    //          ()=>console.log('ev completed..')
    //     );

  }

  addIdx() {
    this.idx = this.idx < this.productItems.length-1 ? this.idx+1 : this.productItems.length-1;
    console.log('addIdx', this.idx);
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
