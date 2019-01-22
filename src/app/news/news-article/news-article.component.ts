import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, takeWhile, tap, timeInterval } from 'rxjs/operators';
import { INewsArticle } from '../interfaces/i-news-article';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { Subject, timer } from 'rxjs';
import { bp_anim_svg_init } from 'src/app/animations/bp_anim_svg-init';
import { NewsService } from '../news.service';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';
import { IPantoneToHex } from 'src/app/pantoneToHex/interfaces/i-pantone-to-hex';
import { SVGElementProp } from 'src/app/shared/svg/classes/svg-element-prop';
import { bp_anim_SVGBorderImage as bp_anim_svgBorderImage } from 'src/app/animations/bp_anim_svg-border-image';
import { ISVGPoint } from 'src/app/shared/svg/interfaces/i-svg-point';
import { ISVGRectBorder } from 'src/app/shared/svg/interfaces/i-svg-rect-border';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css'],
  animations: [
    bp_anim_svg_init(),
    bp_anim_svgBorderImage()
  ]
})
export class NewsArticleComponent implements OnInit, OnDestroy {
  @ViewChild('svgImage') svgImageTEST: ElementRef;
  data: INewsArticle;
  isDestroyed$: Subject<boolean>;
  isReady: boolean;
  bgColor: any;
  rectBorders: ISVGRectBorder[] = [];
  svgImage: ISVGRectBorder = <ISVGRectBorder>{};
  isSVGImageIsReady: boolean;
  svgImageProp: SVGElementProp = new SVGElementProp();
  colorBrick: IPantoneToHex[] = [];


  constructor(
    private cf: CommonFunctionsService,
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
    //this.initSVGData();
    //this.initSVGImage();


    //this.colorBrick = this.pantoneService.getNextPaletteColors("185", 10);
  }

  initSVGData() {
    this.rectBorders = [];
    this.isSVGImageIsReady = false;
    const rectQt = 6;
    const colors = this.pantoneService.getNextPaletteColors(this.data.miniInfo.fill, rectQt, 3)
    const imageFillHeightPercent = 0.70;
    const maxOpacity = 1;
    
    const img = new Image();
    img.setAttribute('src', this.data.miniInfo.imgUrl);
    img.onload = (imgEv: Event)=>{
      console.log('img loaded...', imgEv.timeStamp);
      const mozz = imgEv['explicitOriginalTarget'];
      const chr = imgEv['path'];
      
      const i: HTMLImageElement  = mozz ? mozz : chr[0];
      console.log('now preping borders.....');
      
      const imageRatio = i.naturalWidth / i.naturalHeight;
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
      console.log(rotateStep, rotateStep);
      // console.table(this.rectBorders);
      this.isSVGImageIsReady = true;
      this.setBackgroundColor(colors[colors.length-1]);
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
      console.log('svgImage', ev)
      ev.preventDefault();

      this.renderer.appendChild(this.svgImageTEST.nativeElement, image1);
      const ratio = preImg.naturalWidth/preImg.naturalHeight;
      console.log(ratio);
      console.log(this.svgImageProp.viewBox.width, image1);
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
        console.log(h,w);
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
      console.log('start', evImg);
      evImg.preventDefault();
      evImg.stopImmediatePropagation();

      // let i: any;
      // if(evImg['path'] != undefined) {i = evImg['path'][0];} 
      // if(evImg['explicitOriginalTarget'] != undefined) {i = evImg['explicitOriginalTarget'];} 

      // image1.onload = onLoadImageFn(i);
    }

  
    preImg.onload = (imgEv:Event)=>{
      console.log('img loaded...', imgEv.timeStamp);
      const mozz = imgEv['explicitOriginalTarget'];
      const chr = imgEv['path'];
      
      const i: HTMLImageElement  = mozz ? mozz : chr[0];

      console.log('now image1.....');
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
      this.data.youtubeEmbedUrl = this.data.youtubeEmbedUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.youtubeEmbedUrl) : null;
      this.data.text = d.text ? this.sanitizer.bypassSecurityTrustHtml(this.data.text) : null;
      this.isReady = true;
    }
  }


  setBackgroundColor(color: IPantoneToHex){
    this.bgColor = this.sanitizer.bypassSecurityTrustStyle(`rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`)
  }




}
