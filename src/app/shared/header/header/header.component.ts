import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ISVGProp } from '../../svg/interfaces/i-svg-prop';
import { fromEvent, from, merge, interval, zip, Subject } from 'rxjs';
import { switchMap, takeUntil, take, tap, sampleTime, startWith } from 'rxjs/operators';
import { SvgCommonFunctionsService } from '../../svg/svg-common-functions.service';
import { animationSteps$ } from 'src/app/animations/animation-steps$';
import { IAnimationSteps } from 'src/app/animations/interfaces.ts/i-animation-steps';
import { ISVGPoint } from '../../svg/interfaces/i-svg-point';
import { ISVGVector } from '../../svg/interfaces/i-svg-vector';
import { ISvgViewBox } from '../../svg/interfaces/i-svg-viewbox';
import { SVGElementProp } from '../../svg/classes/svg-element-prop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('onDestroy');
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  @ViewChild('bax') bax: ElementRef;
  @ViewChild('svg') svg: ElementRef;
  isDestroyed$: Subject<boolean>;
  svgBaxLogoProp = new SVGElementProp();
  svgBaxLogSecondLineProp = new SVGElementProp();

  svgProp = new SVGElementProp();
  
  

  constructor(
    private svgCF: SvgCommonFunctionsService
    ) { }

  ngOnInit() {
    this.svgBaxLogoProp.viewBox.copyFrom(this.svgProp.viewBox);
    this.svgBaxLogoProp.svgElement = this.svg.nativeElement;
    
    //
    // set middlepoint offset 
    // 
    //
    this.svgBaxLogoProp.elementOffset.x = 989;
    this.svgBaxLogoProp.elementOffset.y = 519;
    // this.svgBaxLogoProp.elementOffset.x = 347;
    // this.svgBaxLogoProp.elementOffset.y = 330;
    this.svgBaxLogoProp.isOffset = true;


    this.svgBaxLogSecondLineProp.viewBox.copyFrom(this.svgProp.viewBox);
    this.svgBaxLogSecondLineProp.svgElement = this.svg.nativeElement;



    
    this.isDestroyed$ = new Subject();

  }

  ngAfterViewInit(): void {
    const mouseOver$ = fromEvent(this.svg.nativeElement, 'mouseover');
    const mouseLeave$ = fromEvent(this.svg.nativeElement, 'mouseleave');
    const mouseMove$ = fromEvent(this.svg.nativeElement, 'mousemove');


    const move$ = mouseOver$.pipe(
      takeUntil(this.isDestroyed$),
      switchMap(sw => mouseMove$.pipe(
        takeUntil(this.isDestroyed$),
        switchMap((_mouseEv: MouseEvent) => animationSteps$(this.isDestroyed$, _mouseEv, 20, 25))
      )),
    )
      .subscribe(
        (_data: IAnimationSteps) => {
          // console.log('move', _data.step, _data.mouseEvent.clientX);
          // this.svgBaxLogoProp.moveToMousePosition(_data);
          // this.svgBaxLogoProp.moveToMousePositionWithDelay(_data);
          
          this.svgBaxLogoProp.moveHorizontally(_data, 0.05);
          this.svgBaxLogSecondLineProp.moveHorizontally(_data, 0.08);

        },
        (err) => console.log('move error', err),
        () => console.log('move finish..')
      )




  }


}
