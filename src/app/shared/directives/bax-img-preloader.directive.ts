import { Directive, OnInit, ElementRef, Renderer2, AfterViewInit, Input, NgZone } from '@angular/core';

@Directive({
  selector: '[baxImgPreloader]'
})
export class BaxImgPreloaderDirective implements OnInit, AfterViewInit {
  @Input('src') src: string;


  constructor(
    private renderer2: Renderer2,
    private el: ElementRef,
    private ngZone: NgZone

  ) { }



  isImageLoaded: boolean;
  isImageLoading: boolean;

  imgPreload: HTMLImageElement;
  imgDest: HTMLImageElement;

  imgDestUrl: string;
  observe: IntersectionObserver;
  onLoad: any;



  ngOnInit(): void {

    const PUFF_URL: string = 'assets/svg/preloaders/puff.svg';
    const CONTAINER = (<HTMLDivElement>this.el.nativeElement);

    //container set padding
    this.renderer2.setStyle(CONTAINER, 'padding', '10px');


    this.imgDestUrl = this.src || PUFF_URL;

    this.imgPreload = (<HTMLImageElement>this.renderer2.createElement('img'));
    this.renderer2.setAttribute(this.imgPreload, "src", PUFF_URL);
    this.renderer2.appendChild(CONTAINER, this.imgPreload);
    this.renderer2.setStyle(this.imgPreload, 'margin', 'auto');
    this.renderer2.setStyle(this.imgPreload, 'flex', '1 1 250px');
    this.renderer2.setStyle(this.imgPreload, 'min-width', '250px');
    this.renderer2.setStyle(this.imgPreload, 'min-height', '250px');
    this.renderer2.setStyle(this.imgPreload, 'width', '95%');


    this.imgDest = this.renderer2.createElement('img');





    this.onLoad = (parentNode, imgPreload) => (done) => {
      const _PARENT_NODE = (<HTMLDivElement>parentNode);
      this.observe.unobserve(CONTAINER);
      this.observe.disconnect();
      this.isImageLoaded = true;
      setTimeout(() => {
        this.renderer2.removeChild(parentNode, imgPreload);
        this.renderer2.setStyle(this.imgDest, 'display', 'block');
      }, 0);

    }


    this.observe = new IntersectionObserver(entries => {
      entries.forEach((f: IntersectionObserverEntry) => {

        if (!f.isIntersecting) {
          if (this.isImageLoading) {
            this.renderer2.setAttribute(this.imgDest, 'src', '');
            this.isImageLoading = false;
          }
        }

        if (f.intersectionRatio > 0.25) {
          if (!this.isImageLoading) {
            this.imgDest.onload = this.onLoad(CONTAINER, this.imgPreload);
            this.renderer2.setAttribute(this.imgDest, 'src', this.imgDestUrl);
            this.isImageLoading = true;
            this.renderer2.appendChild(CONTAINER, this.imgDest);
            this.setStyles(this.imgDest);
            this.renderer2.setStyle(this.imgDest, 'display', 'none');
          }
        }
      })
    }, { threshold: [0, 0.2, 0.35, 0.5, 0.75, 1] });

    this.observe.observe(CONTAINER);


  }


  ngAfterViewInit(): void {
    const el = (<HTMLImageElement>this.el.nativeElement);
  }


  initImage(imgUrl: string): HTMLImageElement {
    const CONTAINER = (<HTMLDivElement>this.el.nativeElement);
    const _IMG = (<HTMLImageElement>this.renderer2.createElement('img'));
    this.renderer2.setAttribute(_IMG, "src", imgUrl);

    this.renderer2.appendChild(CONTAINER, _IMG);

    return _IMG;
  }

  setStyles(_IMG: HTMLImageElement) {
    this.renderer2.setStyle(_IMG, 'margin', 'auto');
    this.renderer2.setStyle(_IMG, 'flex', '1 1 250px');
    this.renderer2.setStyle(_IMG, 'width', '95%');
  }


}
