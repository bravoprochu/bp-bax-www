import { Directive, OnInit, Host, ElementRef, AfterViewInit, Renderer2, Output, EventEmitter, Input } from '@angular/core';


@Directive({
  selector: '[detectIntersection]'
})
export class DetectIntersectionDirective implements OnInit, AfterViewInit {
  @Input() fill: string;
  @Output() detectIntersection: EventEmitter<boolean> = new EventEmitter();
  

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }


  ngOnInit(): void {
    const htmlEl = (<HTMLElement>this.el.nativeElement);

    let div = this.renderer.createElement('div');

    this.renderer.setStyle(div, 'height', `250px`);
    this.renderer.setStyle(div, 'background-color', `${this.fill}`);
    
    //this.renderer.setStyle(div, 'width', `100%`);
    //this.renderer.set

    this.renderer.appendChild(htmlEl,div); 

    const observe = new IntersectionObserver(entries => {
      entries.forEach((f: IntersectionObserverEntry)=>{

        if(f.intersectionRatio > 0){
          this.renderer.setStyle(div, 'opacity', '0.2');
        }

        if(f.intersectionRatio > 0.05){
          this.renderer.setStyle(div, 'opacity', '0.5');
        }
        
        if(f.intersectionRatio > 0.15) {
          this.renderer.setStyle(div, 'height', '0');
          this.detectIntersection.emit(true);
          observe.unobserve(this.el.nativeElement);
          observe.disconnect();
        }
        
        
      })
     }, {threshold: [0, 0.2, 0.35, 0.75, 1]});
  
     observe.observe(this.el.nativeElement);    
  }

  ngAfterViewInit(): void {

  }


}
