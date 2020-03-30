import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CardPersonService } from 'src/app/otherModules/card-person/card-person.service';
import { ICardPerson } from 'src/app/otherModules/card-person/interfaces/i-card-person';
import { BAX_BRANDS } from 'src/app/shared/enums/bax-brands.enum';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-yanmar-main',
  templateUrl: './yanmar-main.component.html',
  styleUrls: ['./yanmar-main.component.css']
})
export class YanmarMainComponent implements OnInit {


  constructor(
    private cardPersonService: CardPersonService,
    private breakpointObs: BreakpointObserver,
    private router: Router,
    private el: ElementRef,
    private vpScroller: ViewportScroller
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


    

    // this.router.events.pipe(
    //   filter(f=>f instanceof NavigationEnd)
    // )
    // .subscribe(
    //      (_routerEvents:any)=>{
    //           console.log('_routerEvents subs:', _routerEvents);
    //            const t = document.querySelector('app-yanmar-main');
    //            //t.scrollIntoView();
    //            //t.scrollTo(0,0);
              
    //      },
    //      (error)=>console.log('_routerEvents error', error),
    //      ()=>console.log('_routerEvents completed..')
    // );



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



    this.contactCards = this.cardPersonService.getDelaersByMarka(BAX_BRANDS.Yanmar);

  }

}
