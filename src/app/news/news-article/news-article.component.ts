import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, ViewEncapsulation, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, takeUntil } from 'rxjs/operators';
import { INewsArticle } from '../interfaces/i-news-article';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { Subject, timer } from 'rxjs';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';
import { IPantoneToHex } from 'src/app/pantoneToHex/interfaces/i-pantone-to-hex';
import { SVGElementProp } from 'src/app/shared/svg/classes/svg-element-prop';
import { bp_anim_SVGBorderImage as bp_anim_svgBorderImage } from 'src/app/animations/bp_anim_svg-border-image';
import { ISVGRectBorder } from 'src/app/shared/svg/interfaces/i-svg-rect-border';
import { BP_ANIM_OPACITY_OVER_LEAVE } from 'src/app/animations/opacity-over-leave';
import { BP_ANIM_GROUP_APPEARING } from 'src/app/animations/bp_anim_group_appearing';
import { BP_ANIM_OPACITY_INIT } from 'src/app/animations/bp-anim-opacity-init';
import { bpActiveRouteChange$ } from 'src/app/rxConst/bpActRouteChange';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { INewsPayload } from '../interfaces/i-news-payload';
import { isNullOrUndefined } from 'util';



@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css'],
  animations: [
    bp_anim_svgBorderImage(750, 350),
    BP_ANIM_OPACITY_OVER_LEAVE(350, 0.5, 1),
    BP_ANIM_GROUP_APPEARING(250, 100, 'svg, rect, h1, .mat-h2, .mat-h3, app-news-article-date, .content-text, iframe'),
    BP_ANIM_OPACITY_INIT(750, 250)
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NewsArticleComponent implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {
    // console.log('viewInit...');
  }
  @ViewChild('svgImage', { static: false }) svgImageTEST: ElementRef;
  @ViewChild('bg', { static: true }) bg: ElementRef;
  colors: IPantoneToHex[];
  bgColor: any;
  bgImageColor: any;
  data: INewsArticle;
  dataPayload: INewsPayload;
  isColorReady: boolean;
  linkToShare: string;

  ngOnDestroy(): void {
  this.isDestroyed$.next(true);
  this.isDestroyed$.complete();
  this.isDestroyed$.unsubscribe();
  }
 
  
  isDestroyed$: Subject<boolean> = new Subject();
  isArticleNavOver: boolean;
  isReady: boolean;
  isSmall: boolean;

  rectBorders: ISVGRectBorder[] = [];
  svgImage: ISVGRectBorder = <ISVGRectBorder>{};
  isSVGImageIsReady: boolean;
  svgImageProp: SVGElementProp = new SVGElementProp();
  colorBrick: IPantoneToHex[] = [];


  constructor(
    public cf: CommonFunctionsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private actRoute: ActivatedRoute,
    private mediaObserver: MediaObserver,
    private pantoneService: PantoneToHexService,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) { }


  ngOnInit() {
    this.initObservable();
    this.mediaObserver.media$.pipe(
      takeUntil(this.isDestroyed$),
    )
    .subscribe(
      (_data: MediaChange) => {
        this.isSmall = _data.mqAlias == 'xs' ? true : false;
      },
      (err) => console.log(' error', err),
      // () => console.log(' finish..')
    )


    const hammerManager = this.cf.initHammer(this.bg.nativeElement);
    hammerManager.on('swipe', (ev)=>{
      if(ev.direction == Hammer.DIRECTION_LEFT && this.dataPayload.isNext) {
        // swipe left
        this.getNext();
      }
      if(ev.direction == Hammer.DIRECTION_RIGHT && this.dataPayload.isPrev) {
        // swipe right
        this.getPrev();
      }
    });
  }

  articleNavPos():number {
    const bInfo = this.cf.windowBasicInfo;
    const pos = bInfo.isPortrait ? bInfo.height/10 : bInfo.width/2.5;
    return pos;
  }

  initSVGData() {
    this.isSVGImageIsReady = false;
    const rectQt = 6;
    const colors = this.pantoneService.getNextPaletteColors(this.data.miniInfo.fill, rectQt, 3);
    this.colors= colors;
    this.isColorReady = true;
    const imageFillHeightPercent = 0.70;
    const maxOpacity = 1;

    const rgba1 = this.pantoneService.colorToRGBA(colors[0], 0.2);
    const rgba2 = this.pantoneService.colorToRGBA(colors[Math.round(colors.length/2)], 0.2);
    const rgba3 = this.pantoneService.colorToRGBA(colors[colors.length-1], 0.2);
    this.bgImageColor = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(to right, ${rgba1}, ${rgba2}, ${rgba3})`);

    
    const img = new Image();
    img.setAttribute('src', this.data.miniInfo.imgUrl);
    img.onload = (imgEv: Event)=>{
      this.rectBorders = [];      
      const naturalWidth = (<HTMLImageElement>imgEv.srcElement).naturalWidth;
      const naturalHeight = (<HTMLImageElement>imgEv.srcElement).naturalHeight;
      
      const imageRatio = naturalWidth / naturalHeight;
      const h = this.svgImageProp.viewBox.height * imageFillHeightPercent;
      const w = h * imageRatio;
      let rotateStep = -1* (Math.floor((Math.random()*10) ));
      
      const middlePoint = this.svgImageProp.getCenterPositionByPercent(imageFillHeightPercent);
      for(let i=0; i < rectQt; i++) {
        const r = <ISVGRectBorder> {
          color: i < colors.length ? colors[i].hex : colors[colors.length-1].hex,
          posX: middlePoint.x.toString(),
          posY: middlePoint.y.toString(),
          height: h.toString(),
          width: w.toString(),
          radius: "10",
          strokeWidth: "150",
          strokeOpacity: `${(i+1)*(maxOpacity / rectQt)}`,
          transform: `rotate(${rotateStep.toString()}, 960, 540)`
        }
        rotateStep += 0.8;
       this.rectBorders.push(r);
      }

      this.svgImage = {
        posX: middlePoint.x.toString(),
        posY: middlePoint.y.toString(),
        height: h.toString(),
        width: w.toString(),
        transform: this.rectBorders[this.rectBorders.length-1].transform
      }
      
      this.setBackgroundColor(colors[colors.length-1]);
      this.isSVGImageIsReady = true;
    }
  }

  


  initSVGImage(){

    const appendedImage = (<SVGSVGElement>this.svgImageTEST.nativeElement).querySelector('image');
    const appendedRects = (<SVGSVGElement>this.svgImageTEST.nativeElement).querySelectorAll('rect');

    if(appendedImage) {
      appendedImage.remove();
    }
    appendedRects.forEach(f=>f.remove())

    this.svgImageProp = new SVGElementProp();
    
    const rectBorderNo = 6;
    const maxOpacity = 1;
    const colors = this.pantoneService.getNextPaletteColors(this.data.miniInfo.fill, rectBorderNo, 4);
    
    this.setBackgroundColor(colors[rectBorderNo-1]);

    const image1 = <SVGImageElement>this.renderer.createElement('image', 'svg');

    //this.renderer.setAttribute(image1, 'href', this.data.imgUrl + `?_${new Date().getTime()}`);
    this.renderer.setAttribute(image1, 'href', this.data.imgUrl);

    const rectBorderToRender: SVGRectElement[] = [];
    const imagePercent = 0.70;

    //this.svgImageProp.setPositionAttributeByCenterViewBoxPercent(image1, imagePercent);
    

    //
    // new Image to get natura size of image..
    //
    const preImg = new Image();
    preImg.src = this.data.imgUrl;

    const onLoadImageFn = () => (ev:Event)=>{
      ev.preventDefault();

      this.renderer.appendChild(this.svgImageTEST.nativeElement, image1);
      const ratio = preImg.naturalWidth/preImg.naturalHeight;
      // image1.setAttribute('height', preImg.naturalHeight);
      // image1.setAttribute('width', preImg.naturalWidth);
      this.svgImageProp.setPositionAttributeByCenterViewBoxPercent(image1, 0.8, preImg.naturalHeight, preImg.naturalWidth)
      let step = -7;
      // rectBorderToRender.forEach(r=>{
      //     this.renderer.appendChild(this.svgImage.nativeElement, r);

      // });
      // const middle = this.svgImageProp.getCenterPositionByPercent(imagePercent);
      const h = image1.height.animVal.value.toString();
      const w =image1.width.animVal.value.toString();
      
      for (let i = 0; i < rectBorderNo; i++) {
        const imgBorder = <SVGRectElement>this.renderer.createElement('rect', 'svg');
        imgBorder.setAttribute('transform', `rotate(${step}, ${this.svgImageProp.viewBox.middlePoint().x}, ${this.svgImageProp.viewBox.middlePoint().y})`);
        imgBorder.setAttribute('height', "864");
        imgBorder.setAttribute('width', "1534");
        
        step+=1.75

        this.svgImageProp.setPositionAttributeByCenterViewBoxPercent(imgBorder, imagePercent, preImg.naturalHeight, preImg.naturalWidth);
        this.svgImageProp.setRectBorder(imgBorder, 95 - (i*2), colors[rectBorderNo-i-1].hex, ((i+1)*(maxOpacity/rectBorderNo)), 5, 100);  
        
        this.renderer.appendChild(this.svgImageTEST.nativeElement, imgBorder);
      }

      const n = (<SVGSVGElement>this.svgImageTEST.nativeElement).childNodes
      
      //
      // swap images depth
      //
      n[8].before(n[2]);
    }


    //
    // chained onLoad to set proper width 
    //

    const onLoadImgFn = () => (evImg: Event) => {
      evImg.preventDefault();
      evImg.stopImmediatePropagation();

      // let i: any;
      // if(evImg['path'] != undefined) {i = evImg['path'][0];} 
      // if(evImg['explicitOriginalTarget'] != undefined) {i = evImg['explicitOriginalTarget'];} 

      // image1.onload = onLoadImageFn(i);
    }

  
    preImg.onload = (imgEv:Event)=>{
      const mozz = imgEv['explicitOriginalTarget'];
      const chr = imgEv['path'];
      
      const i: HTMLImageElement  = mozz ? mozz : chr[0];

    }

    // image1.onload = (imagesEv) => {
    //   console.log('image1 loaded...', imagesEv.timeStamp);

    //   image1.setAttribute('width', i.naturalWidth.toString());
    //   image1.setAttribute('height', i.naturalHeight.toString());
    //   image1.setAttribute('x', "0");
    //   image1.setAttribute('y', "0");


    //   this.renderer.appendChild(this.svgImage.nativeElement, image1);
    // }
    
    
    
      image1.onload = onLoadImageFn();
  }


  getNext() {
    // console.log('swipe left...', this.dataPayload)
    this.router.navigateByUrl(`/news/${this.dataPayload.nextId}`);
  }
  
  getPrev() {
    //console.log('swipe right..');
    this.router.navigateByUrl(`/news/${this.dataPayload.prevId}`);
  }

  initObservable() {
    this.actRoute.params.pipe(
      bpActiveRouteChange$(this.isDestroyed$),
      tap(()=>this.isReady = false),
    )
      .subscribe(
        (_data: any) => {
          
          this.initData();
          this.initSVGData();
          
          const _title = `${this.data.title.title} ${isNullOrUndefined(this.data.title.shortTitle)? '': this.data.title.shortTitle} ${isNullOrUndefined(this.data.title.subtitle)? '': this.data.title.subtitle} ${isNullOrUndefined(this.data.title.subtitle2)? '': this.data.title.subtitle2}`
          this.cf.metaTitleUpdate(`NEWS | ${_title}`);
          this.cf.metaDescriptionUpdate(_title);
          this.cf.metaOpenGraphProductTag(_title, window.location.href, `${window.location.origin}${(<string>this.data.imgUrl).replace('.','')}`);

          
          

          // this.ngZone.runTask(()=>{
          //   const el = (<HTMLElement>this.bg.nativeElement);
            
            

          //   setTimeout(() => {
          //     console.log(el.scrollHeight );  
          //     el.scrollTo({top: 0, behavior: 'smooth'});
          //     window.scrollTo(0,0);
          //   }, 1000);

            
            
          // })


          // console.log(window.scrollY);
          // window.scroll(0, 0);
          

          
          
          
        },
        (err) => console.log('actRoute error', err),
        // () => console.log('actRoute finish..')
      )
  }

  

  initData() {
    this.data = <INewsArticle>{};
    this.dataPayload = <INewsPayload>this.actRoute.snapshot.data['data'];
    this.initLinkToShare(window.location.pathname);
    
      this.data = Object.assign({}, this.dataPayload.news);
      // this.data.youtubeEmbedUrl = this.data.youtubeEmbedUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.youtubeEmbedUrl) : null;
      // this.data.text = d.text ? this.sanitizer.bypassSecurityTrustHtml(this.data.text) : null;
      this.isReady = true;
    this.initSVGData();
  }

  initLinkToShare(route){
    this.linkToShare = route;
  }


  setBackgroundColor(color: IPantoneToHex){
    this.bgColor = this.sanitizer.bypassSecurityTrustStyle(`rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`)
  }


  swipe(ev: any) {
    // console.log(ev);
    // ev.preventDefault();
    // window.scrollTo({top: ev.center.y})
    // switch (ev.direction) {
    //   case 8:
    //   //this.getNext();
    //   window.scrollTo({top: ev.center.y})
    //   break;

    //   case 16:
    //   window.scrollTo({top: ev.center.y})
    //    //this.getPrev();
    //   break;


    //   default:
        
    //   break
    // }
    // console.log('swipe', ev);

  }



}
