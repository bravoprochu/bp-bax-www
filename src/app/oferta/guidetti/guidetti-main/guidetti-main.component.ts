import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CardPersonService } from 'src/app/common/card-person/card-person.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { ICardPerson } from 'src/app/common/interfaces/i-card-person';
import { takeUntil } from 'rxjs/operators';


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
    const _LANDSCAPE = [Breakpoints.HandsetLandscape, Breakpoints.TabletLandscape, Breakpoints.WebLandscape];
    const _PORTRAIT = [Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait, Breakpoints.WebPortrait];
    const _SMALL = [Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape];
    const _REST = [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge];

    this.breakpointObs.observe([..._REST]).pipe(
      takeUntil(this.isDestroyed$)
    )
      .subscribe(
        (_breakpObs: any) => {
          this.cssMainTextCols = 'oferta-main-text-col-2';

          if (this.breakpointObs.isMatched(_SMALL)) {
            this.cssMainTextCols = this.breakpointObs.isMatched(_PORTRAIT) ? '' : 'oferta-main-text-col-2'
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