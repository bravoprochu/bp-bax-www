import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CardPersonService } from 'src/app/otherModules/card-person/card-person.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { ICardPerson } from 'src/app/otherModules/card-person/interfaces/i-card-person';
import { takeUntil } from 'rxjs/operators';
import { bp_braakpointsAll, bp_braakpointsSmall, bp_braakpointsPortrait } from '@sharedConst/bp_breakpoints';


@Component({
  selector: 'app-guidetti-main',
  templateUrl: './guidetti-main.component.html',
  styleUrls: ['./guidetti-main.component.css']
})
export class GuidettiMainComponent implements OnInit, AfterViewInit {
  @ViewChild('gallery01') gallery01: ElementRef
  


  constructor(
    private cardPersonService: CardPersonService,
    private breakpointObs: BreakpointObserver,
  ) { }

  isDestroyed$: Subject<boolean> = new Subject()
  cssMainTextCols: string;
  contactCards: ICardPerson[];
  


  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
    this.isDestroyed$.unsubscribe();
  }

  ngOnInit() {
    this.breakpointObs.observe(bp_braakpointsAll()).pipe(
      takeUntil(this.isDestroyed$)
    )
      .subscribe(
        (_breakpObs: any) => {
          this.cssMainTextCols = 'oferta-main-text-col-2';
          if (this.breakpointObs.isMatched(bp_braakpointsSmall())) {
            this.cssMainTextCols = this.breakpointObs.isMatched(bp_braakpointsPortrait()) ? '' : 'oferta-main-text-col-2'
          }
        },
        (error) => console.log('_breakpObs error', error),
        () => console.log('_breakpObs completed..')
      );

    



    this.contactCards = [];
    this.contactCards.push(this.cardPersonService.getDelaerByName('salomon'));
    }
    
  ngAfterViewInit(): void {
    // const imagesUrls:string[] = [
    //   '../../../../assets/oferta/1x1/guidetti/IMG-20191105-WA0022.JPG',
    //   '../../../../assets/oferta/1x1/guidetti/IMG_20191105_135916.JPG'
    // ]
    // const g1 = (<HTMLElement>this.gallery01.nativeElement);

    // console.log(g1.getBoundingClientRect().width);

    // const svg1 = this.svgSrv.generateSVG(this.renderer2);


    // this.renderer2.appendChild(svg1, this.svgSrv.generateImage(this.renderer2, imagesUrls[0]));

    // this.renderer2.appendChild(g1, svg1);
  }



}