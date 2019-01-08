import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, Sanitizer, AfterViewInit, Renderer2 } from '@angular/core';
import { fromEvent, Observable, Subject, interval, timer, merge } from 'rxjs';
import { takeUntil, switchMap, map, timeInterval, timeout, mergeAll, combineAll, mergeMap, take, repeat, retry, repeatWhen, mergeMapTo, switchMapTo, sampleTime, last, takeWhile, tap, count } from 'rxjs/operators';
import { AnimationBuilder, animate, style, AnimationPlayer } from '@angular/animations';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';
import { ISVGPoint } from 'src/app/shared/svg/interfaces/i-svg-point';
import { ISvgViewBox } from 'src/app/shared/svg/interfaces/i-svg-viewbox';
import { BP_ANIM_OPACITY_OVER_LEAVE } from 'src/app/animations/opacity-over-leave'
import { BP_ANIM_SCALE_ORIGIN_OVER_LEAVE } from 'src/app/animations/scale-origin-over-leave';
import { BP_ANIM_TRANSFORM_ORIGIN } from 'src/app/animations/transform-origin';
import { SVGElementProp } from 'src/app/shared/svg/classes/svg-element-prop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css'],
  animations: [
    BP_ANIM_SCALE_ORIGIN_OVER_LEAVE(0, 1, 1, 0.0),
  ]
})
export class NewsArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('fill') fill: string;
  @Input('invert') invert: boolean;
  @Input('pointer') pointer: string;
  @Input('url') url: string;
  @Input('title') title: string;
  @ViewChild('followMouse') followMouse: ElementRef;
  @ViewChild('svg') svg: ElementRef;
  @ViewChild('titleText') titleText:ElementRef;
  bgUrl: SafeResourceUrl;
  image: SVGElementProp;
  isReady:boolean;
  isDestroyed$: Subject<boolean>;
  isMouseOver: boolean;
  mousePoint: ISVGPoint;
  player: AnimationPlayer;
  svgViewBox = '0 0 1920 1080';
  followMousePos: ISVGPoint = <ISVGPoint>{ x: 0, y: 0 };
  lastMousePos: ISVGPoint = <ISVGPoint>{ x: -1, y: -1 };
  titleTextBox: ClientRect;




  ngOnDestroy(): void {
  }
  // @ViewChild('box') box: ElementRef;
  // @ViewChild('elToMove') elToMove: ElementRef;

  constructor(
    private renderer: Renderer2,
    private sanitize: DomSanitizer,
    private _builder: AnimationBuilder,
    private svgCF: SvgCommonFunctionsService
  ) { }

  followFn: any;


  ngOnInit() {
    this.bgUrl = this.url ?  'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg': this.sanitize.bypassSecurityTrustResourceUrl('https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');
    this.url = this.url ? this.url : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    this.fill = this.fill ? this.fill : 'green';
    this.pointer = this.pointer ? this.pointer : 'brown'
    this.title = this.title ? this.title : 'uzupełnij tytuł'
    this.image = new SVGElementProp();
    this.image.size.width = 960;
    this.image.size.height = 480;
    this.isDestroyed$ = new Subject();
    this.initObservable();
  }


  ngAfterViewInit(): void {
    // this.titleTextBox = (<SVGTextElement>this.titleText.nativeElement).getBoundingClientRect();
    // const tSVG = this.titleText.nativeElement;
    // const title: SVGTextElement = this.renderer.createElement('text', 'svg');
    // const t = this.renderer.createText("whaaaaa ?");
    // const rect = <SVGRectElement>this.renderer.createElement('rect', 'svg')
    // rect.setAttributeNS('svg', 'x', '0');
    // rect.setAttributeNS('svg', 'y', '0');
    // rect.setAttributeNS('svg', 'height', '150');
    // rect.setAttributeNS('svg', 'width', '200');
    

    // title.setAttribute("x", "0");
    // title.setAttribute("y", "0");
    // title.setAttribute("width", "200");
    // title.setAttribute("height", "200");
    // title.setAttribute("font-size", "64px");

    // this.renderer.appendChild(t, title);
    // this.renderer.appendChild(tSVG, title);
    // this.renderer.appendChild(tSVG, rect);




  }

  

  initObservable() {

    const fn = (()=>{
      console.log('start');
      const counter = 0;
      setTimeout((counter: number)=>{
        counter ++
      }, 250)
    })();

    const over$ = fromEvent(this.svg.nativeElement, 'mouseover').pipe(
      map(is => {
        this.isMouseOver = true;
        return is
      })
    );
    const leave$ = fromEvent(this.svg.nativeElement, 'mouseleave').pipe(
      map(leave=>{
        //this.svgCF.updateSVGViewBoxPosition(svg, this.followMousePos, this.lastMousePos, null, this.followMouse, ease);
        this.isMouseOver = false;
        return leave;
      })
    );
    const move$ = fromEvent(this.svg.nativeElement, 'mousemove').pipe(
      takeUntil(leave$)
    );
    const timeToRefresh = 1;
    const refresh$ = interval(timeToRefresh).pipe(
    );
    const mouseMove$ = move$.pipe(
      sampleTime(timeToRefresh),

    )


    const up$ = over$.pipe(
      switchMap(isOn => merge(refresh$, mouseMove$).pipe(takeUntil(leave$))),
      map(val => {
        const svg = (<SVGSVGElement>this.svg.nativeElement);
        const ease = 15;
        if (val instanceof MouseEvent) {
          val.preventDefault();
          const _mousePoint: ISVGPoint = <ISVGPoint>{
            x: val.clientX,
            y: val.clientY
          }
          this.mousePoint = _mousePoint;
          this.svgCF.updateSVGViewBoxPosition(svg, this.followMousePos, this.lastMousePos, _mousePoint, this.followMouse, ease);
        } else {
          this.svgCF.updateSVGViewBoxPosition(svg, this.followMousePos, this.lastMousePos, null, this.followMouse, ease);
        }
        return val;
      })
    )
      .subscribe(
        (_data: any) => {
          // console.log('interval', _data);
        },
        (err) => console.log('interval error', err),
        () => console.log('interval finish..')
      );


    const m$ = over$.pipe(
      switchMap(ov => move$),
      map((_mouseEv: MouseEvent) => {

        return _mouseEv;
      })
    );
    // .subscribe(
    //   (_data: MouseEvent) => {
    //   // console.log('moveTo', _data);
    //   },
    //   (err) => console.log('moveTo error', err),
    //   () => console.log('moveTo finish..')
    // );
  }

  sqrtIt(num: number): number {
    if (num == 0) { return 0 };
    if (num > 0) { return Math.round(Math.sqrt(num)); }
    if (num < 0) {
      let res = Math.abs(num);
      res = Math.sqrt(res);
      res = Math.round(res);
      res = res
      return res;
      Math.round(Math.sqrt(Math.abs(num)) * -1);
    }
  }

  count: number = 0;
}

