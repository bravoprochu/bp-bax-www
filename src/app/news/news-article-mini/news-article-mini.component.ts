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
import { BP_ANIM_ENTER_LEAVE_GROUP } from 'src/app/animations/enter-leave-group';
import { Router } from '@angular/router';
import { bp_anim_svg_init } from 'src/app/animations/bp_anim_svg-init';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';

@Component({
  selector: 'app-news-article-mini',
  templateUrl: './news-article-mini.component.html',
  styleUrls: ['./news-article-mini.component.css'],
  animations: [
    BP_ANIM_SCALE_ORIGIN_OVER_LEAVE(0, 1, 1, 0.0),
    BP_ANIM_ENTER_LEAVE_GROUP(1300, 1200),
    bp_anim_svg_init()
    
  ]
})
export class NewsArticleMiniComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('miniInfo') miniInfo: INewsArticleMini;
  @ViewChild('followMouse') followMouse: ElementRef;
  @ViewChild('svg') svg: ElementRef;
  @ViewChild('titleText') titleText:ElementRef;
  fill: string;
  imgUrl: string;
  invert: boolean;
  pointer: string;
  url: string;
  title: string;

  bgUrl: SafeResourceUrl;
  image: SVGElementProp;
  isReady:boolean = false;
  isDestroyed$: Subject<boolean>;
  isMouseOver: boolean;
  mousePoint: ISVGPoint;
  player: AnimationPlayer;
  svgViewBox = '0 0 1920 1080';
  followMousePos: ISVGPoint = <ISVGPoint>{ x: 0, y: 0 };
  lastMousePos: ISVGPoint = <ISVGPoint>{ x: -1, y: -1 };
  titleTextBox: ClientRect;
  routeUrl: any;




  ngOnDestroy(): void {
  }
  // @ViewChild('box') box: ElementRef;
  // @ViewChild('elToMove') elToMove: ElementRef;

  constructor(
    private renderer: Renderer2,
    private sanitize: DomSanitizer,
    private _builder: AnimationBuilder,
    private svgCF: SvgCommonFunctionsService,
    private router: Router,
    private pantoneService: PantoneToHexService,
  ) { }

  followFn: any;


  ngOnInit() {
    this.miniInfo = this.miniInfo ? this.miniInfo : <INewsArticleMini>{};


    this.bgUrl = this.miniInfo.imgUrl ?  'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg': this.sanitize.bypassSecurityTrustResourceUrl('https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');
    this.imgUrl = this.miniInfo.imgUrl ? this.imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    this.fill = this.fill ? this.fill : '#ff00ff';
    
    this.pointer = this.pointer ? this.pointer : 'brown'
    this.title = this.title ? this.title : 'uzupełnij tytuł';
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

  goTo(){
    this.router.navigateByUrl(`news/${this.miniInfo.url}#top`, {preserveFragment: false, fragment: 'top'});
  }
  

  initObservable() {
    const fn = (()=>{
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


}

