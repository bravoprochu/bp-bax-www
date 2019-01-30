import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, takeWhile, tap, timeInterval } from 'rxjs/operators';
import { INewsArticle } from '../interfaces/i-news-article';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { Subject, timer } from 'rxjs';
import { NewsService } from '../news.service';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';
import { IPantoneToHex } from 'src/app/pantoneToHex/interfaces/i-pantone-to-hex';
import { SVGElementProp } from 'src/app/shared/svg/classes/svg-element-prop';
import { bp_anim_SVGBorderImage as bp_anim_svgBorderImage } from 'src/app/animations/bp_anim_svg-border-image';
import { ISVGRectBorder } from 'src/app/shared/svg/interfaces/i-svg-rect-border';
import { BP_ANIM_OPACITY_OVER_LEAVE } from 'src/app/animations/opacity-over-leave';
import { BP_ANIM_GROUP_APPEARING } from 'src/app/animations/bp_anim_group_appearing';
import { BP_ANIM_OPACITY_INIT } from 'src/app/animations/bp-anim-opacity-init';
import * as Hammer from 'hammerjs';


@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css'],
  animations: [
    bp_anim_svgBorderImage(750, 350),
    BP_ANIM_OPACITY_OVER_LEAVE(350, 0.5, 1),
    BP_ANIM_GROUP_APPEARING(250, 100, 'svg, rect, h1, app-news-article-date, .content-text, iframe'),
    BP_ANIM_OPACITY_INIT(750, 250)
  ]
})
export class NewsArticleComponent implements OnInit, OnDestroy {
  @ViewChild('svgImage') svgImageTEST: ElementRef;
  @ViewChild('bg') bg: ElementRef;
  bgColor: any;
  bgImageColor: any;
  data: INewsArticle;
  isArticleNavOver: boolean;
  isDestroyed$: Subject<boolean>;
  isReady: boolean;

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
    public ns: NewsService,
    private pantoneService: PantoneToHexService,
    private renderer: Renderer2,
  ) { }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  ngOnInit() {
    this.isDestroyed$ = new Subject();
    this.initObservable();


    const hammerManager = new Hammer(this.bg.nativeElement, {})

    hammerManager.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL});
    hammerManager.get('pinch').set({enable: false});
    hammerManager.get('rotate').set({enable: false});

    hammerManager.on('swipe', (ev)=>{
      if(ev.direction == 2) {
        // swipe left
        this.getNext();
      }
      if(ev.direction == 4) {
        // swipe right
        this.getPrev();
      }
    })


    //this.initSVGData();
    //this.initSVGImage();

    //this.colorBrick = this.pantoneService.getNextPaletteColors("185", 10);
  }

  articleNavPos():number {
    const bInfo = this.cf.windowBasicInfo;
    const pos = bInfo.isPortrait ? bInfo.height/10 : bInfo.width/2.5;
    return pos;
  }

  initSVGData() {
    this.rectBorders = [];
    this.isSVGImageIsReady = false;
    const rectQt = 6;
    const colors = this.pantoneService.getNextPaletteColors(this.data.miniInfo.fill, rectQt, 3);
    const imageFillHeightPercent = 0.70;
    const maxOpacity = 1;

    const rgba1 = this.pantoneService.colorToRGBA(colors[0], 0.2);
    const rgba2 = this.pantoneService.colorToRGBA(colors[2], 0.2);
    const rgba3 = this.pantoneService.colorToRGBA(colors[4], 0.2);
    this.bgImageColor = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(to right, ${rgba1}, ${rgba2}, ${rgba3})`);

    
    const img = new Image();
    img.setAttribute('src', this.data.miniInfo.imgUrl);
    img.onload = (imgEv: Event)=>{
      
      const naturalWidth = (<HTMLImageElement>imgEv.srcElement).naturalWidth;
      const naturalHeight = (<HTMLImageElement>imgEv.srcElement).naturalHeight;
      
      const imageRatio = naturalWidth / naturalHeight;
      const h = this.svgImageProp.viewBox.height * imageFillHeightPercent;
      const w = h * imageRatio;
      let rotateStep = -1* (Math.floor((Math.random()*10) ));
      
      const middlePoint = this.svgImageProp.getCenterPositionByPercent(imageFillHeightPercent);
      for(let i=0; i < rectQt; i++) {
        const r = <ISVGRectBorder> {
          color: colors[i].hex,
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
    if(this.ns.isNext(this.data)){
      this.router.navigateByUrl(`/news/${this.ns.getNext(this.data).id}`);
    }
  }
  
  getPrev() {
    if(this.ns.isPrev(this.data)){
      this.router.navigateByUrl(`/news/${this.ns.getPrev(this.data).id}`);
    }
  }

  initObservable() {
    this.actRoute.params.pipe(
      tap(()=>this.isReady = false)
    )
      .subscribe(
        (_data: any) => {
          
          this.initData(_data['id']);
          this.initSVGData();
        },
        (err) => console.log('actRoute error', err),
        () => console.log('actRoute finish..')
      )
  }

  isSmall(): boolean{
    return this.cf.getMediaChange().mqAlias == 'xs' ? true: false;
  }


  initData(routeId: string) {
    this.data = <INewsArticle>{};
    const d = this.ns.findById(routeId);
    if (d) {
      this.data = Object.assign({}, d);
      // this.data.youtubeEmbedUrl = this.data.youtubeEmbedUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.youtubeEmbedUrl) : null;
      this.data.text = d.text ? this.sanitizer.bypassSecurityTrustHtml(this.data.text) : null;
      this.isReady = true;
    }
  }


  setBackgroundColor(color: IPantoneToHex){
    this.bgColor = this.sanitizer.bypassSecurityTrustStyle(`rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`)
  }


  swipeLeft(ev: any) {
    console.log('swipeLeft');
    this.getNext();
  }

  swipeRight(ev: any){
    console.log('swipeRight');
    this.getPrev();
  }



  swipe(ev: any) {
    console.log(ev);
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
