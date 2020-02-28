import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { fromEvent, Observable, observable, empty, of } from 'rxjs';
import { take, map, debounceTime, delay, switchMap, takeUntil, retry, repeat, sampleTime, tap, pairwise, buffer, bufferCount, bufferWhen, bufferTime, bufferToggle, merge, mergeAll } from 'rxjs/operators';
import { IMouseMovePosition } from './interfaces/i-mouse-move-position';
import { DomSanitizer } from '@angular/platform-browser';
import { state, style, transition, animate, trigger, query, AnimationBuilder, group, AnimationPlayer, animation } from '@angular/animations';



@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.css'],
  animations: [
    trigger('moveBgText', [
      state('over', style({ opacity: 0.75})),
      state('leave', style({ opacity: 0.25})),
      transition('over<=>leave', animate('0.8s ease-in')),
    ]),
    trigger('titleText', [
      state('over', style({ opacity: 1, fill: 'white'})),
      state('leave', style({ opacity: 0.75, fill: 'lightgrey'})),
      transition('leave<=>over', [
        animate('0.5s')]
      ),
      
    ]),
    trigger('scaleIt', [
      state('scaleUp', style({ transform: 'scale3d(1.2, 1.2, 1.2)' })),
      state('scaleDown', style({ transform: 'scale3d(1.1, 1.1, 1.1)' })),
      transition('scaleUp<=>scaleDown', [animate('10s ease-in')]),
    ]
    ),
  ]
})



export class ArticleContainerComponent implements OnInit, AfterViewInit {
  @Input('colorBg') colorBg: string;
  @Input('colorGradientFrom') colorGradientFrom: string;
  @Input('colorGradientTo') colorGradientTo: string;
  @Input('imageUrl') imageUrl: any;
  @Input('opacity') opacity: number;
  @Input('title') title: string;

  //@Input('staggerDelay') staggerDelay:number;


  //@ViewChild('divContainer') divContainer: ElementRef;
  @ViewChild('svgImage', {static: true}) svgImageContainer: ElementRef;
  @ViewChild('svgBgText', {static: true }) svgBgText: ElementRef;
  @ViewChild('svgContainer', {static: true }) svgContainer: ElementRef;
  @ViewChild('svgBaxSign', {static: true }) svgBaxSign: ElementRef;
  @ViewChild('svgTitleText', {static: true }) svgTitleText: ElementRef;
  

  constructor(
    private renderer2: Renderer2,
    private sanitize: DomSanitizer,
    private builder: AnimationBuilder
  ) { }

  ngOnInit() {
    this.imageUrl = this.imageUrl ? this.imageUrl : `${environment.imageFolder}/yanmar01.jpg`;
    this.imageUrlSanitized = this.sanitize.bypassSecurityTrustUrl(this.imageUrl);

    this.opacity = this.opacity ? this.opacity : 0.6;
    this.title = this.title ? this.title : 'default title';

    //this.staggerDelay = this.staggerDelay ? this.staggerDelay : 0;

    this.colorBg = this.colorBg ? this.colorBg : "grey";
    this.colorGradientFrom = this.colorGradientFrom ? `#${this.colorGradientFrom}` : 'grey';
    this.colorGradientTo = this.colorGradientTo ? `#${this.colorGradientTo}` : 'white';
    this.initImage();
    this.svgImageLoaded$ = fromEvent(this.svgImage, 'load');

    //this.initContainerWidth();

  }
  ngAfterViewInit(): void {
    this.initObservables();
        

    //this.initContainerWidth();
    // let divWidth = (<HTMLElement>this.divContainer.nativeElement).getBoundingClientRect().width;
    // let bgTextWidth = (<SVGTextElement>this.svgBgText.nativeElement).getBoundingClientRect().width;
    // let t= (<SVGTextElement>this.svgBgText.nativeElement).getAttribute('text');
    // this.svgBgTextWidth=bgTextWidth-divWidth;
  }



  animStart(ev: AnimationEvent) {
    console.log("start:", ev);
  }

  animDone(ev: AnimationEvent) {
    console.log("done:", ev);
  }

  imageUrlSanitized: any;
  info: string = "wczytuje...."

  mouseOver$: Observable<MouseEvent>;
  mouseLeave$: Observable<MouseEvent>;
  mouseMove$: Observable<MouseEvent>;

  //imageLoaded$: Observable<Event>;
  imageScaleIsDone: boolean;
  isSvgImageLoaded: boolean;
  isMouseOver: boolean = false;
  player: AnimationPlayer;

  svgHeight: number = 1080;
  svgWidth: number = 1920;
  svgImage: HTMLImageElement;
  svgImageHeight: number = this.svgHeight;
  svgImageLoaded$: Observable<Event>;
  svgImageWidth: number = this.svgWidth;

  //svgViewBox: string = `0 0 ${this.svgImageWidth} ${this.svgImageHeight}`;
  svgViewBox: string = "0 0 1920 1080";

  svgCirclePosX: number = 0;
  svgCirclePosY: number = 0;
  svgGradientId: string = `grad${this.getUniqueId()}`;
  svgTextMaskId: string = `mask${this.getUniqueId()}`;

  initImage() {
    this.svgImage = new Image();
    this.svgImage.setAttributeNS(null, "src", this.imageUrl);
  }

  //#region subs$
  initObservables() {
    this.svgImageLoaded$.pipe(
      take(1),
      map((ev: Event) => {
        return ev.target;
      })
    )
      .subscribe(
        (_data: HTMLImageElement) => {
          this.svgImageWidth = _data.width;
          this.svgImageHeight = _data.height;
          //this.svgViewBox = `0 0 ${_data.width} ${_data.height}`;
          this.isSvgImageLoaded = true;
        },
      )

    const mouseOver$ = fromEvent(this.svgContainer.nativeElement, 'mouseover');
    const mouseMove$ = fromEvent(this.svgContainer.nativeElement, 'mousemove');
    const mouseLeave$ = fromEvent(this.svgContainer.nativeElement, 'mouseleave').pipe(
      map((_mouseLeave: boolean) => {
        let svg = (<SVGSVGElement>this.svgContainer.nativeElement);
        let svgBax = (<SVGImageElement>this.svgBaxSign.nativeElement).getBoundingClientRect();

        let p = this.getNativeElementMiddlePoint(this.svgContainer.nativeElement);
        let x = p.x - svgBax.width / 2;
        let y = p.y - svgBax.height / 2;

        //
        // ractangle ancor-point
        //
        //let points = this.translateMousePosToSVGViewBoxPos(svg, x, y);

        let points = this.translateMousePosToSVGViewBoxPos(svg, p.x, p.y);

        let d = svg.createSVGPoint();
        let scale:number = 0.4;
        const animation = this.builder.build([
          
            animate('250ms', style({ transform: `translate3d(${points.x}px, ${points.y}px, 0px) scale3d(${scale}, ${scale},${scale})`, opacity: 0 })),
            //animate('500ms ease-out', style({ opacity: 0}))
          

        ]);
        this.player = animation.create(this.svgBaxSign.nativeElement);
        this.player.play();
        return _mouseLeave;
      })
    );

    const mmove$ = mouseMove$.pipe(
      takeUntil(mouseLeave$),
    );


    mouseOver$.pipe(

      switchMap(on => mmove$),
      map((_mouseEvent: MouseEvent) => {
        return _mouseEvent;
      })
    )
      .subscribe(
        (_data: MouseEvent) => {
          const svgBax = (<SVGImageElement>this.svgBaxSign.nativeElement);
          let w = svgBax.getBoundingClientRect().width / 2;
          let h = svgBax.getBoundingClientRect().height / 2;
          const svg = this.svgContainer.nativeElement;
          //let points = this.translateMousePosToSVGViewBoxPos(svg, this.nativeElementMiddlePoint(svg).x, this.nativeElementMiddlePoint(svg).y);
          
          //
          //anchor-point for rectangle:
          //let points = this.translateMousePosToSVGViewBoxPos(svg, _data.clientX - w, _data.clientY - h);
          //

          let points = this.translateMousePosToSVGViewBoxPos(svg, _data.clientX, _data.clientY);
          let scale:number = 1.6;
          const animation = this.builder.build([

              //animate('500ms', style({ opacity: 0.98 })),
              animate('350ms ease-out', style({ transform: `translate3d(${points.x}px, ${points.y}px, 0px) scale3d(${scale}, ${scale},${scale})`, opacity: 0.98 })),

          ])
          // if(this.player){
          //   this.player.destroy();
          // }
          this.player = animation.create(svgBax);
          this.player.play();
        },
        (err) => console.log('move$ error', err),
        () => console.log('move$ finish..')
      );

    //let svgimg = document.createElementNS('', 'image');
    //svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.imageUrl);

    //let svgImg =  this.svgImageContainer.nativeElement.append('image');
    // let svgImg = this.renderer2.createElement('image', 'http://www.w3.org/2000/svg');
    // this.renderer2.appendChild(this.svgImageContainer.nativeElement, svgImg);

    // this.renderer2.setAttribute(svgImg, "xlink:href", this.imageUrl);
    // this.renderer2.setProperty(svgImg, 'width', '100%');
    //svgImg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.imageUrl);





    // svgImageLoad$.pipe(
    //   map((_ev) => {
    //     console.log('maping...')
    //     return _ev;
    //   }),
    // )
    //   .subscribe(
    //     (_data: any) => {

    //     },
    //     (err) => console.log(' error', err),
    //     () => console.log(' finish..')
    //   )

  }



  //#endregion

  //#region functions
  initContainerWidth() {
    // this.svgWidth = (<HTMLElement>this.divContainer.nativeElement).getBoundingClientRect().width;
    // this.svgHeight = this.svgWidth / (16 / 9);
    // this.svgViewBox = `0 0 ${this.svgWidth} ${this.svgHeight}`;
  }

  svgCirclePos: any


  translateMousePosToSVGViewBoxPos(svg: SVGSVGElement, xPos: number, yPos: number): DOMPoint {
    let res: IMouseMovePosition = <IMouseMovePosition>{};
    let point: SVGPoint = svg.createSVGPoint();
    point.x = xPos;
    point.y = yPos;

    return point.matrixTransform(svg.getScreenCTM().inverse());
  }

  getNativeElementMiddlePoint(nativeElement: HTMLElement): IMouseMovePosition {
    let bbox = nativeElement.getBoundingClientRect();
    return <IMouseMovePosition>{
      x: bbox.left + (bbox.width / 2),
      y: bbox.top + (bbox.height / 2)
    }
  }


  getSvgGradientId(): string {
    return `url(#${this.svgGradientId})`;
  }

  getSvgTextMaskId(): string {
    return `url(#${this.svgTextMaskId})`;

  }

  getMoveFrom() {
    return { value: 'goFrom', params: { x: 100, y: 200 } };
  }

  getUniqueId(): string {
    return `${parseInt(Math.random().toString().replace('.', ''))}`;
  }

  //#endregion
}


