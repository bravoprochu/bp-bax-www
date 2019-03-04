import { Directive, Renderer2, Host, OnInit, Input, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import { BaxMarka } from 'src/app/oferta/enums/bax-marka-enum';
import { environment } from 'src/environments/environment.prod';



@Directive({
  selector: '[baxPreloader]'
})
export class BaxPreloaderDirective implements AfterViewInit, OnInit {
  @Input('marka') marka: number;
  @Input('imgUrl') imgUrl: string;
  @Input('showInfo') showInfo: boolean;
  @Input('title') title: string;
  @Input('subtitle') subtitle: string;

  intersection$: IntersectionObserver;
  isIntersecting: boolean;
  isPortrait: boolean;
  isDimmensionSet: boolean;
  isSvgAppended: boolean;
  height: number
  svg: SVGElement;


  svgImage: SVGImageElement;
  svgImgBaxSign: SVGImageElement;
  svgPreloadBox: SVGRectElement;
  svgPreloadImg: SVGImageElement;
  svgTextTitle: SVGTextElement;
  svgTextSubtitle: SVGTextElement;
  width: number;


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
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
    const h = box.width /(16/9);
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
      this.svgPreloadImg.remove();
      this.svgTextTitle.remove();
      this.svgTextSubtitle.remove();


      if(this.showInfo == true){
        this.renderer.appendChild(this.svg, this.svgTextTitle);
        this.renderer.appendChild(this.svg, this.svgTextSubtitle);

        this.svgTextTitle.textContent = `Błąd przy ładowaniu`;
        this.svgTextSubtitle.textContent = `${this.imgUrl}`;
      }
      this.intersectionKill();
    }
    img.onload = (ev) => {
      this.svgPreloadImg.remove();
      this.svgImgBaxSign.remove();
      this.svgPreloadBox.remove();
      this.svgTextTitle.remove();
      this.svgTextSubtitle.remove();
      
      const _w = img.naturalWidth;
      const _h = img.naturalHeight;
      const _isPortrait: boolean = _w >= _h ? false : true;

      if (_isPortrait) {
        const ratio = _h / _w;
        // this.renderer.setAttribute(this.svgImage, 'width', '1920');
        // this.renderer.setAttribute(this.svgImage, 'height', (_w * (16 / 9)).toString());
      } else {
        const ratio = _w / _h;
        this.renderer.setAttribute(this.svgImage, 'width', _w.toString());
        this.renderer.setAttribute(this.svgImage, 'height', (_w * (16 / 9)).toString());
      }

      this.renderer.setAttribute(this.svgImage, 'width', '1920');
      this.renderer.setAttribute(this.svgImage, 'height', '1080');

      setTimeout(() => {
      this.renderer.setAttribute(this.svgImage, 'href', this.imgUrl);
      this.renderer.appendChild(this.svg, this.svgImage);
      if(this.showInfo == true) {
        this.renderer.appendChild(this.svg, this.svgTextTitle);
        this.renderer.appendChild(this.svg, this.svgTextSubtitle);
      }

      this.renderer.setStyle(this.el.nativeElement, 'height', _h.toString());
      this.renderer.setStyle(this.el.nativeElement, 'width', _w.toString());
      
      this.intersectionKill();
      }, 0);
    }

  }


  initSVG() {
    const _width = 1920;
    const _height =  1080;

    const _widthStr = _width.toString();
    const _heightStr = _height.toString();

    this.svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(this.svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(this.svg, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    this.renderer.setAttribute(this.svg, 'viewBox', `0 0 ${_widthStr} ${_heightStr}`);
    this.renderer.setAttribute(this.svg, 'preserveAspectRatio', 'xMidYMid meet');
    this.renderer.setAttribute(this.svg, 'width', '100%');
    this.renderer.setAttribute(this.svg, 'height', '100%');

    this.svgPreloadBox = this.renderer.createElement('rect', 'svg');
    this.renderer.setAttribute(this.svgPreloadBox, 'width', _widthStr);
    this.renderer.setAttribute(this.svgPreloadBox, 'height', _heightStr);
    this.renderer.setAttribute(this.svgPreloadBox, 'x', '0');
    this.renderer.setAttribute(this.svgPreloadBox, 'y', '0');
    this.renderer.setAttribute(this.svgPreloadBox, 'fill', this.getFilColor());
    this.renderer.setAttribute(this.svgPreloadBox, 'opacity', '0.25');

    this.renderer.appendChild(this.svg, this.svgPreloadBox);

    this.svgPreloadImg = this.renderer.createElement('image', 'svg');
    this.renderer.setAttribute(this.svgPreloadImg, 'width', _widthStr);
    this.renderer.setAttribute(this.svgPreloadImg, 'height', _heightStr);
    this.renderer.setAttribute(this.svgPreloadImg, 'x', '0');
    this.renderer.setAttribute(this.svgPreloadImg, 'y', '0');
    this.renderer.setAttribute(this.svgPreloadImg, 'preserveAspectRatio', 'xMidYMid meet');
    this.renderer.setAttribute(this.svgPreloadImg, 'href', './assets/svg/preloaders/puff.svg');
    this.renderer.appendChild(this.svg, this.svgPreloadImg);


    this.svgImgBaxSign = this.renderer.createElement('image', 'svg');
    this.renderer.setAttribute(this.svgImgBaxSign, 'width', _widthStr);
    this.renderer.setAttribute(this.svgImgBaxSign, 'height', _heightStr);
    this.renderer.setAttribute(this.svgImgBaxSign, 'x', '0');
    this.renderer.setAttribute(this.svgImgBaxSign, 'y', '0');
    this.renderer.setAttribute(this.svgImgBaxSign, 'preserveAspectRatio', 'xMidYMid meet');
    this.renderer.setAttribute(this.svgImgBaxSign, 'href', './assets/svg/logotypy/logo_bax_signOnly.svg');
    this.renderer.setAttribute(this.svgImgBaxSign, 'opacity', '0.25');

    this.renderer.appendChild(this.svg, this.svgImgBaxSign);

    this.svgImage = this.renderer.createElement('image', 'svg');
    this.renderer.setAttribute(this.svgImage, 'viewBox', '0 0 1920 1080' );
    this.renderer.setAttribute(this.svgImage, 'x', '0');
    this.renderer.setAttribute(this.svgImage, 'y', '0');
    this.renderer.setAttribute(this.svgImage, 'preserveAspectRatio', 'xMidYMid meet');

    this.svgTextTitle = this.renderer.createElement('text', 'svg');
    this.renderer.setAttribute(this.svgTextTitle, 'width', _widthStr);
    this.renderer.setAttribute(this.svgTextTitle, 'height', _heightStr);
    this.renderer.setAttribute(this.svgTextTitle, 'x', '25');
    this.renderer.setAttribute(this.svgTextTitle, 'y',  '920');
    this.renderer.setAttribute(this.svgTextTitle, 'fill', 'grey');
    this.renderer.setAttribute(this.svgTextTitle, 'font-size', '100');
    this.svgTextTitle.textContent = this.title;
    // this.renderer.appendChild(this.svg, this.svgTextTitle);

    this.svgTextSubtitle = this.renderer.createElement('text', 'svg');
    this.renderer.setAttribute(this.svgTextSubtitle, 'width', _widthStr);
    this.renderer.setAttribute(this.svgTextSubtitle, 'height', _heightStr);
    this.renderer.setAttribute(this.svgTextSubtitle, 'x', '25');
    this.renderer.setAttribute(this.svgTextSubtitle, 'y',  '1000');
    this.renderer.setAttribute(this.svgTextSubtitle, 'fill', 'grey');
    this.renderer.setAttribute(this.svgTextSubtitle, 'font-size', '50');
    this.svgTextSubtitle.textContent = this.subtitle;
    // this.renderer.appendChild(this.svg, this.svgTextSubtitle);


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
          this.svgPreloadBox.setAttribute('opacity', '0.8');
        }
        if (ratio > 0.5 && ratio <= 0.75) {
          this.svgPreloadBox.setAttribute('opacity', '0.4');
        }
        if (ratio > 0.75 && ratio < 1) {
          this.svgPreloadBox.setAttribute('opacity', '0.2');
        }
        if (ratio == 1) {
          this.svgPreloadBox.setAttribute('opacity', '0.1');
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
      res= environment.colorBax;
      break;
    }
    return res;
  }


}


