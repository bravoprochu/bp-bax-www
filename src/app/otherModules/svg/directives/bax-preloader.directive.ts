import { Directive, Renderer2, Host, OnInit, Input, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import { BaxMarka } from 'src/app/sites/oferta/enums/bax-marka-enum';
import { environment } from 'src/environments/environment.prod';
import { SvgCommonFunctionsService } from '../svg-common-functions.service';




@Directive({
  selector: '[baxPreloader]'
})
export class BaxPreloaderDirective implements AfterViewInit, OnInit {
  @Input('marka') marka: number;
  @Input('imgUrl') imgUrl: string;
  @Input('showInfo') showInfo: boolean;
  @Input('title') title: string;
  @Input('titleColor') titleColor: string = "DarkGrey"
  @Input('subtitle') subtitle: string;
  @Input('subtitleColor') subtitleColor: string = "Grey"

  height: number;
  intersection$: IntersectionObserver;
  isIntersecting: boolean;
  isPortrait: boolean;
  isDimmensionSet: boolean;
  isSvgAppended: boolean;
  linearGradientId: string = this.svgCf.getUniqeId('linearGradient');


  svg: SVGElement;



  svgImage: SVGImageElement;
  svgImgBaxSign: SVGImageElement;
  svgPreloadBox: SVGRectElement;
  svgPreloadPuff: SVGImageElement;
  svgTextTitle: SVGTextElement;
  svgTextSubtitle: SVGTextElement;
  width: number;


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public svgCf: SvgCommonFunctionsService,
  ) { }


  ngOnInit(): void {
    this.imgUrl = this.imgUrl ? this.imgUrl : `https://picsum.photos/1920/1080/?image=${Math.floor(Math.random() * 100) + 500}`;
  }

  ngAfterViewInit(): void {
    // this.initBoxSize();
    this.initSVG();
    this.initIntersection();

    let brand = '';
    // console.log(`isDimmens: ${this.isDimmensionSet}, ${this.width}/${this.height}, isPortrait: ', ${this.isPortrait}, ratio: ${16/9}, marka: ${<BaxMarka>this.marka}`);
  }

  finishStyling() {
    const box = (<HTMLElement>this.el.nativeElement).getBoundingClientRect();
    const h = box.width / (16 / 9);
    // this.renderer.setStyle(this.el.nativeElement, 'height', h.toString()+'px');
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
  }


  initBoxSize() {
    const box = (<HTMLElement>this.el.nativeElement).getBoundingClientRect();
    const widthProp = (<HTMLElement>this.el.nativeElement).getAttribute('width');
    const heightProp = (<HTMLElement>this.el.nativeElement).getAttribute('height');
    const fitRatio = 16 / 9;
    let _width = 0;
    let _height = 0;


    this.isDimmensionSet = (widthProp && heightProp) ? true : false;

    if (this.isDimmensionSet) {
      _width = parseFloat(widthProp);
      _height = parseFloat(heightProp);
    } else {
      _width = box.width;
      _height = box.height;
    }

    // console.log(`initBox: ${_width}/${_height}`)

    this.isPortrait = _width <= _height ? true : false;

    this.width = this.isPortrait ? _height : _width;
    this.height = this.isPortrait ? _width : _height;

    if (!this.isDimmensionSet) {
      this.renderer.setStyle(this.el.nativeElement, 'height', _height.toString() + 'px');
      this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    }
  }

  initImgLoad() {
    let img = new Image();
    img.src = this.imgUrl;
    img.width = this.width;
    img.onerror = (ev) => {
      this.renderer.removeChild(this.svg, this.svgPreloadPuff);
      this.renderer.removeChild(this.svg, this.svgTextTitle);
      this.renderer.removeChild(this.svg, this.svgTextSubtitle);

      if (this.showInfo == true) {
        this.renderer.appendChild(this.svg, this.svgTextTitle);
        this.renderer.appendChild(this.svg, this.svgTextSubtitle);

        this.svgTextTitle.textContent = `Błąd przy ładowaniu`;
        this.svgTextSubtitle.textContent = `${this.imgUrl}`;
      }
      this.intersectionKill();
    }
    img.onload = (ev) => {
      setTimeout(() => {
        this.renderer.removeChild(this.svg, this.svgImgBaxSign);
        this.renderer.removeChild(this.svg, this.svgPreloadPuff);
        this.renderer.removeChild(this.svg, this.svgPreloadBox);

        this.renderer.removeChild(this.svg, this.svgTextTitle);
        this.renderer.removeChild(this.svg, this.svgTextSubtitle);

        const _w = img.naturalWidth;
        const _h = img.naturalHeight;
        const _isPortrait: boolean = _w >= _h ? false : true;

        // if (_isPortrait) {
        //   const ratio = _h / _w;
        //   // this.renderer.setAttribute(this.svgImage, 'width', '1920');
        //   // this.renderer.setAttribute(this.svgImage, 'height', (_w * (16 / 9)).toString());
        // } else {
        //   const ratio = _w / _h;
        //   this.renderer.setAttribute(this.svgImage, 'width', _w.toString());
        //   this.renderer.setAttribute(this.svgImage, 'height', (_w * (16 / 9)).toString());
        // }

        this.renderer.setAttribute(this.svgImage, 'width', '1920');
        this.renderer.setAttribute(this.svgImage, 'height', '1080');


        // this.renderer.setAttribute(this.svgImage, 'href', this.imgUrl);
        // this.renderer.appendChild(this.svg, this.svgImage);
        
        // if (this.showInfo == true) {
        //   this.renderer.appendChild(this.svg, this.svgTextTitle);
        //   this.renderer.appendChild(this.svg, this.svgTextSubtitle);
        // }

        let newImg = this.renderer.createElement('img');
        this.renderer.setAttribute(newImg, 'width', '100%');
        // this.renderer.setAttribute(newImg, 'height', _h.toString());
        this.renderer.setAttribute(newImg, 'src', this.imgUrl);

        this.renderer.removeChild(this.el.nativeElement, this.svg);
        this.renderer.appendChild(this.el.nativeElement, newImg);
        


        this.renderer.setStyle(this.el.nativeElement, 'height', _h.toString());
        this.renderer.setStyle(this.el.nativeElement, 'width', _w.toString());

        this.intersectionKill();
      }, 0);
    }

  }


  initSVG() {
    const _width = 1920;
    const _height = 1080;

    const _widthStr = _width.toString();
    const _heightStr = _height.toString();

    this.svg = this.svgCf.generateSVG(this.renderer, `0 0 ${_widthStr} ${_heightStr}`);
    const defs = this.svgCf.generateDefs(this.renderer);
    this.renderer.appendChild(this.svg, defs);
    const linearGradient: SVGLinearGradientElement = this.svgCf.generateLinearGradient(this.renderer, this.linearGradientId)
    this.renderer.appendChild(defs, linearGradient);

    let s1: SVGStopElement = this.svgCf.generateLinearGradientStopElement(this.renderer);
    this.renderer.appendChild(linearGradient, s1);

    let s2: SVGStopElement = this.svgCf.generateLinearGradientStopElement(this.renderer, "60%", this.getFilColor(), "0.4");
    this.renderer.appendChild(linearGradient, s2);

    let s3: SVGStopElement = this.svgCf.generateLinearGradientStopElement(this.renderer, "1", this.getFilColor());
    this.renderer.appendChild(linearGradient, s3);



    this.svgPreloadBox = this.svgCf.generateRect(this.renderer, _widthStr, _heightStr, `url(${window.location.href}#${this.linearGradientId}`)
    this.renderer.appendChild(this.svg, this.svgPreloadBox);

    this.svgPreloadPuff = this.svgCf.generateImage(this.renderer, './assets/svg/preloaders/puff.svg', _widthStr, _heightStr);
    this.renderer.appendChild(this.svg, this.svgPreloadPuff);

    this.svgImgBaxSign = this.svgCf.generateImage(this.renderer, './assets/svg/logotypy/logo_bax_signOnly.svg', _widthStr, _heightStr, "0.25");
    this.renderer.appendChild(this.svg, this.svgImgBaxSign);

    this.svgImage = this.svgCf.generateImage(this.renderer);

    this.svgTextTitle = this.svgCf.generateText(this.renderer, this.title, "100", this.titleColor, "25", "900", _widthStr, _heightStr);
    this.renderer.appendChild(this.svg, this.svgTextTitle);

    this.svgTextSubtitle = this.svgCf.generateText(this.renderer, this.subtitle, "50", this.subtitleColor, "25", "1000", _widthStr, _heightStr);
    this.renderer.appendChild(this.svg, this.svgTextSubtitle);


    // const d:HTMLCollectionOf<SVGDefsElement> = this.svg.getElementsByTagName('defs');
    // console.log('getByTag', d, d.length);
  }


  initIntersection() {
    this.intersection$ = new IntersectionObserver(entries => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        this.isIntersecting = true;
        const ratio = entry.intersectionRatio;

        if (ratio > 0) {
          if (!this.isSvgAppended) {
            this.renderer.appendChild(this.el.nativeElement, this.svg);
            // this.renderer.setStyle(this.el.nativeElement, 'height', 'auto');
            this.initImgLoad();
            this.isSvgAppended = true;
          }
        }
        if (ratio >= 0.25 && ratio <= 0.5) {
          //  this.svgPreloadBox.setAttribute('opacity', '0.8');
        }
        if (ratio > 0.5 && ratio <= 0.75) {
          // this.svgPreloadBox.setAttribute('opacity', '0.4');
        }
        if (ratio > 0.75 && ratio < 1) {
          // this.svgPreloadBox.setAttribute('opacity', '0.2');
        }
        if (ratio == 1) {
          // this.svgPreloadBox.setAttribute('opacity', '0.1');
        }
      })
    }, { threshold: [0, .25, .50, .75, 1] })

    this.intersection$.observe(this.el.nativeElement);
  }


  intersectionKill() {
    if (this.isIntersecting) {
      this.intersection$.unobserve(this.el.nativeElement);
      this.intersection$.disconnect();
      this.isIntersecting = false;
      this.finishStyling();
    }
  }


  getFilColor(): string {
    let res: string;

    switch (this.marka) {
      case BaxMarka.Yanmar:
        res = environment.colorYanmar;
        break;

      case BaxMarka.Sennebogen:
        res = environment.colorSennebogen;
        break;

      case BaxMarka.Arjes:
        res = environment.colorArjes;
        break;

      default:
        res = environment.colorBax;
        break;
    }
    return res;
  }


}


