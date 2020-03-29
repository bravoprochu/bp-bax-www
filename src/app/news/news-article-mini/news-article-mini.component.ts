import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, Sanitizer, AfterViewInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { fromEvent, Observable, Subject, interval, timer, merge } from 'rxjs';
import { takeUntil, switchMap, map, sampleTime } from 'rxjs/operators';
import { AnimationPlayer } from '@angular/animations';
import { SvgCommonFunctionsService } from './node_modules/src/app/otherModules/svg/svg-common-functions.service';
import { ISVGPoint } from './node_modules/src/app/otherModules/svg/interfaces/i-svg-point';
import { BP_ANIM_SCALE_ORIGIN_OVER_LEAVE } from './node_modules/src/app/animations/scale-origin-over-leave';
import { SVGElementProp } from './node_modules/src/app/otherModules/svg/classes/svg-element-prop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BP_ANIM_ENTER_LEAVE_GROUP } from './node_modules/src/app/animations/enter-leave-group';
import { Router } from '@angular/router';
import { BP_ANIM_SVG_INIT } from './node_modules/src/app/animations/bp_anim_svg-init';
import { INewsArticleMini } from '../interfaces/i-news-article-mini';
import { Platform} from '@angular/cdk/platform';


@Component({
  selector: 'app-news-article-mini',
  templateUrl: './news-article-mini.component.html',
  styleUrls: ['./news-article-mini.component.css'],
  animations: [
    BP_ANIM_SCALE_ORIGIN_OVER_LEAVE(0, 1, 1, 0.0),
    BP_ANIM_ENTER_LEAVE_GROUP(1300, 1200),
    BP_ANIM_SVG_INIT(350, 200, "text, rect, line")
  ]
})
export class NewsArticleMiniComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('miniInfo') miniInfo: INewsArticleMini;

  @ViewChild('followMouse', { static: true }) followMouse: ElementRef;
  @ViewChild('svg', { static: true }) svg: ElementRef;
  @ViewChild('titleText', { static: true }) titleText: ElementRef;
  

  constructor(
    private platform: Platform,
    private renderer: Renderer2,
    private router: Router,
    private sanitize: DomSanitizer,
    private svgCF: SvgCommonFunctionsService,

    
  ) { }


  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
    this.isMouseOver = false;
  }


  fill: string;
  imgUrl: string;
  invert: boolean;
  pointer: string;
  url: string;


  _miniInfo: INewsArticleMini;
  bgUrl: SafeResourceUrl;
//  image: SVGElementProp;
  image: SVGImageElement;
  img: HTMLImageElement;
  isImageLoaded: boolean;
  isImageLoading: boolean;
  isReady: boolean = false;
  isDestroyed$: Subject<boolean>;
  isMouseOver: boolean;
  mousePoint: ISVGPoint;
  NO_ONLOAD_BROWSERS: Boolean = !this.platform.IOS && !this.platform.SAFARI && !this.platform.EDGE;
  player: AnimationPlayer;
  svgViewBox = '0 0 1920 1080';
  followMousePos: ISVGPoint = <ISVGPoint>{ x: 0, y: 0 };
  lastMousePos: ISVGPoint = <ISVGPoint>{ x: -1, y: -1 };
  observe: IntersectionObserver;
  title: string;
  titleTextBox: ClientRect;
  routeUrl: any;
  followFn: any;


  ngOnInit() {
    this.isDestroyed$ = new Subject();
    this._miniInfo = this._miniInfo ? this._miniInfo : <INewsArticleMini>{};
    this.bgUrl = this._miniInfo.imgUrl ? 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' : this.sanitize.bypassSecurityTrustResourceUrl('https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');
    this.imgUrl = this._miniInfo.imgUrl ? this.imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    this.fill = this.fill ? this.fill : '#fff';

    


    this.pointer = this.pointer ? this.pointer : 'brown'
    this.title = this.title ? this.title : 'uzupełnij tytuł';
    // this.image = new SVGElementProp();
    // this.image.size.width = 960;
    // this.image.size.height = 480;

    this.initImage()
    this.initIntersection()
    this.initObservable();
  }
  
  
  initIntersection() {

    const SVG_CONTAINER:SVGElement = this.svg.nativeElement;
    const _HREF:string = 'href';

    this.observe = new IntersectionObserver(entries=>{
      entries.forEach((f:IntersectionObserverEntry)=>{
        if(!f.isIntersecting) {
          if(this.isImageLoading) {
            
            if(this.NO_ONLOAD_BROWSERS) {
              this.renderer.setAttribute(this.image, _HREF, '');
              this.isImageLoading = false;
            }
          }
        }
        if(f.intersectionRatio > 0.15){
          this.renderer.setAttribute(this.image, _HREF, this.svgCF.getOriginUrl(this.miniInfo.imgUrl));
          this.isImageLoading = true;

          if(this.platform.EDGE || this.platform.IOS || this.platform.SAFARI) {

              this.observe.unobserve(SVG_CONTAINER);
              this.observe.disconnect();
              console.log(`safar/edge/ios stopped intersectionObserver for ${this.miniInfo.title} after 2s... `);

          }
          
        }
      })
    },{threshold: [0,0.2,0.5,0.75,1]});


    this.observe.observe(SVG_CONTAINER);
    
  }


  ngAfterViewInit(): void {

  }

  goTo() {
    if (this._miniInfo.isExternalUrl) {

    } else {
      this.router.navigate(['news', this.miniInfo.url]);
    }
  }

  initImage() {

    const SVG_CONTAINER:SVGElement = this.svg.nativeElement;
    

    this.image = this.renderer.createElement('image', 'svg');
    this.image = this.svgCF.generateImage(this.renderer, null, "100%", "100%");
    this.renderer.insertBefore(SVG_CONTAINER, this.image, SVG_CONTAINER.children[1]);



    if(this.NO_ONLOAD_BROWSERS) {
      this.renderer.setStyle(this.image, 'display', 'none');
    } 
       
    this.image.onload = (done) => {
      this.isImageLoaded = true;
      this.observe.disconnect();
      this.observe.unobserve(this.svg.nativeElement);
      this.renderer.setStyle(this.image, 'display', 'block');
    }
  }


  initObservable() {
    const over$ = fromEvent(this.svg.nativeElement, 'mouseover').pipe(
      map(is => {
        this.isMouseOver = true;
        return is
      })
    );
    const leave$ = fromEvent(this.svg.nativeElement, 'mouseleave').pipe(
      map(leave => {
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
  }


}

