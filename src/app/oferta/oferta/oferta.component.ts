import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, OnDestroy, Sanitizer, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import {MediaMatcher} from '@angular/cdk/layout';
import { CdkVirtualScrollViewport, ViewportRuler } from '@angular/cdk/scrolling';
import { takeUntil, map, timeout, tap, delay, switchMap, startWith, take, takeWhile, repeat, mergeAll} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject, fromEvent, of, merge } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

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
    private viewportRuler: ViewportRuler
    ){}



  productItems: string[] = ['sennebogen', 'arjes', 'guidetti', 'yanmar'];
  idx: number = 0;
  items = Array.from({length: 1000}).map((_, i) => `Item #${i}`);
  isDestroyed$: Subject<boolean> = new Subject();
  itemSize: number = 500;

  
  
  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  }

  ngOnInit() {

    this.viewportRuler.change().pipe(
      startWith(null)
    )
    .subscribe(
         (_vpRull:any)=>{
                this.ngZone.run(()=>{
                this.itemSize = this.viewportRuler.getViewportSize().height;
               });
         },
         (error)=>console.log('_vpRull error', error),
         ()=>console.log('_vpRull completed..')
    );
    

    const mouseWheel$ = fromEvent(this.el.nativeElement, "mousewheel").pipe(
      take(1),
      tap((ev:WheelEvent)=>{
        this.ngZone.run(()=>{
          console.log(this.productItems);
          ev.deltaY >0 ? this.addIdx() : this.removeIdx();
          
        });
        this.viewPort.scrollTo({top: this.itemSize*this.idx});
        ev.preventDefault();
      })
    ).pipe(
      repeat(100)
    )
      .subscribe(
           (mouseWheel:any)=>{
                console.log('mouseWheel subs:', mouseWheel);
                
           },
           (error)=>console.log('mouseWheel error', error),
           ()=>console.log('mouseWheel completed..')
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
